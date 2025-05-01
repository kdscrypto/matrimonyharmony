
import { useAuth } from "@/contexts/AuthContext";
import RsvpList from "@/components/admin/RsvpList";
import LoginForm from "@/components/admin/LoginForm";
import { Button } from "@/components/ui/button";
import { LogOut, Shield } from "lucide-react";

const Admin = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-2 flex items-center justify-center gap-2">
          <Shield className="text-wedding-burgundy dark:text-wedding-gold" size={24} />
          Administration
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
          Espace réservé à la gestion des réponses RSVP
        </p>
        
        {isAuthenticated ? (
          <>
            <div className="flex justify-end mb-4">
              <Button 
                variant="outline" 
                onClick={logout}
                className="flex items-center gap-2"
              >
                <LogOut size={16} />
                Se déconnecter
              </Button>
            </div>
            <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <RsvpList />
            </div>
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};

export default Admin;
