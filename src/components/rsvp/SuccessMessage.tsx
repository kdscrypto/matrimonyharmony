
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

interface SuccessMessageProps {
  resetForm: () => void;
}

const SuccessMessage = ({ resetForm }: SuccessMessageProps) => {
  return (
    <Card className="bg-white rounded-lg shadow-md p-6 border-t-4 border-wedding-gold">
      <CardContent className="pt-6 px-2 text-center">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <Check className="text-green-600 w-6 h-6" />
        </div>
        <h3 className="text-2xl font-playfair mb-4">Merci pour votre réponse !</h3>
        <p className="mb-6">
          Votre réponse a bien été enregistrée. Nous avons hâte de vous compter parmi nous pour ce jour spécial.
        </p>
        <Button 
          variant="outline" 
          onClick={resetForm}
          className="hover:bg-wedding-gold hover:text-white"
        >
          Soumettre une autre réponse
        </Button>
      </CardContent>
    </Card>
  );
};

export default SuccessMessage;
