
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Lock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isBlocked, remainingLockoutTime } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      toast({
        title: "Compte temporairement bloqué",
        description: `Trop de tentatives échouées. Veuillez réessayer dans ${remainingLockoutTime} minutes.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await login(password);
      
      if (!result.success && result.message) {
        toast({
          title: "Erreur d'authentification",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erreur système",
        description: "Une erreur inattendue s'est produite. Veuillez réessayer ultérieurement.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-playfair mb-2 text-center">Connexion Administrateur</h2>
      <p className="text-center text-gray-500 mb-6">Accès sécurisé à l'espace d'administration</p>
      
      {isBlocked && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Compte temporairement bloqué suite à trop de tentatives échouées.
            <br />Veuillez réessayer dans {remainingLockoutTime} minutes.
          </AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe"
              className="pl-10"
              required
              disabled={isBlocked || isLoading}
            />
          </div>
        </div>
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isBlocked || isLoading || !password}
        >
          {isLoading ? "Vérification..." : "Se connecter"}
        </Button>
      </form>
      
      <div className="mt-4 text-xs text-gray-500">
        <p className="text-center">
          Zone sécurisée - Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
