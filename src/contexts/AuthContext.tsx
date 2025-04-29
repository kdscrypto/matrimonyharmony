
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { verifyAdminPassword, recordFailedLoginAttempt, resetLoginAttempts, isLoginBlocked, getRemainingLockoutTime, logSecurityEvent } from "@/services/security.service";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<{success: boolean, message?: string}>;
  logout: () => void;
  isBlocked: boolean;
  remainingLockoutTime: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingLockoutTime, setRemainingLockoutTime] = useState(0);

  useEffect(() => {
    // Vérifier si une session existe déjà
    const authStatus = localStorage.getItem("admin-auth");
    if (authStatus === "authenticated") {
      setIsAuthenticated(true);
    }
    
    // Vérifier si le compte est bloqué
    checkLoginBlocked();
    
    // Vérifier périodiquement si le blocage est toujours actif
    const interval = setInterval(checkLoginBlocked, 60000); // Vérifier toutes les minutes
    
    return () => clearInterval(interval);
  }, []);
  
  const checkLoginBlocked = () => {
    const blocked = isLoginBlocked();
    setIsBlocked(blocked);
    if (blocked) {
      setRemainingLockoutTime(getRemainingLockoutTime());
    } else {
      setRemainingLockoutTime(0);
    }
  };

  const login = async (password: string): Promise<{success: boolean, message?: string}> => {
    // Vérifier si le compte est bloqué
    if (isLoginBlocked()) {
      return {
        success: false,
        message: `Trop de tentatives échouées. Veuillez réessayer dans ${getRemainingLockoutTime()} minutes.`
      };
    }
    
    // Vérifier le mot de passe
    if (verifyAdminPassword(password)) {
      setIsAuthenticated(true);
      localStorage.setItem("admin-auth", "authenticated");
      resetLoginAttempts();
      
      // Journaliser la connexion réussie
      await logSecurityEvent("admin_login_success", { timestamp: new Date().toISOString() });
      
      return { success: true };
    } else {
      recordFailedLoginAttempt();
      checkLoginBlocked();
      
      // Journaliser la tentative échouée
      await logSecurityEvent("admin_login_failed", { 
        timestamp: new Date().toISOString(),
        is_blocked: isLoginBlocked()
      });
      
      return {
        success: false,
        message: isBlocked 
          ? `Trop de tentatives échouées. Veuillez réessayer dans ${remainingLockoutTime} minutes.` 
          : "Mot de passe incorrect."
      };
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin-auth");
    logSecurityEvent("admin_logout", { timestamp: new Date().toISOString() });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isBlocked, remainingLockoutTime }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
