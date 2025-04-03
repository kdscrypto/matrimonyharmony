
import { useAuth } from "@/contexts/AuthContext";
import RsvpList from "@/components/admin/RsvpList";
import LoginForm from "@/components/admin/LoginForm";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const Admin = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-6">Administration</h1>
        
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
            <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8">
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
