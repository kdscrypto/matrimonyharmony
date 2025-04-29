
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
  const [lastActivity, setLastActivity] = useState(Date.now());
  const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes en millisecondes

  useEffect(() => {
    // Vérifier si une session existe déjà
    const authStatus = localStorage.getItem("admin-auth");
    if (authStatus === "authenticated") {
      const lastActivityTime = localStorage.getItem("admin-last-activity");
      if (lastActivityTime) {
        const parsedTime = parseInt(lastActivityTime, 10);
        const now = Date.now();
        
        // Vérifier si la session a expiré
        if (now - parsedTime > SESSION_TIMEOUT) {
          // Session expirée, déconnecter l'utilisateur
          setIsAuthenticated(false);
          localStorage.removeItem("admin-auth");
          localStorage.removeItem("admin-last-activity");
          
          logSecurityEvent("admin_session_expired", { timestamp: new Date().toISOString() });
        } else {
          setIsAuthenticated(true);
          setLastActivity(parsedTime);
        }
      } else {
        setIsAuthenticated(true);
        updateLastActivity();
      }
    }
    
    // Vérifier si le compte est bloqué
    checkLoginBlocked();
    
    // Vérifier périodiquement si le blocage est toujours actif
    const blockCheckInterval = setInterval(checkLoginBlocked, 60000); // Vérifier toutes les minutes
    
    // Vérifier périodiquement l'activité de l'utilisateur
    const activityCheckInterval = setInterval(() => {
      if (isAuthenticated) {
        const lastActivityTime = localStorage.getItem("admin-last-activity");
        if (lastActivityTime) {
          const parsedTime = parseInt(lastActivityTime, 10);
          const now = Date.now();
          
          // Si aucune activité pendant la durée spécifiée, déconnecter l'utilisateur
          if (now - parsedTime > SESSION_TIMEOUT) {
            logout();
            logSecurityEvent("admin_session_timeout", { 
              timestamp: new Date().toISOString(),
              timeout_minutes: SESSION_TIMEOUT / 60000
            });
          }
        }
      }
    }, 60000); // Vérifier toutes les minutes
    
    // Ajouter des écouteurs d'événements pour suivre l'activité de l'utilisateur
    const updateActivity = () => {
      if (isAuthenticated) {
        updateLastActivity();
      }
    };
    
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    
    return () => {
      clearInterval(blockCheckInterval);
      clearInterval(activityCheckInterval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
    };
  }, [isAuthenticated]);
  
  const updateLastActivity = () => {
    const now = Date.now();
    setLastActivity(now);
    localStorage.setItem("admin-last-activity", now.toString());
  };
  
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
      updateLastActivity();
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
    localStorage.removeItem("admin-last-activity");
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
