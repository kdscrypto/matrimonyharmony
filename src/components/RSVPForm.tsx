
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Info, Check, X, UserPlus, Utensils } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Définir le schéma de validation pour le formulaire RSVP
const rsvpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  attending: z.enum(["yes", "no"], {
    required_error: "Veuillez indiquer si vous serez présent",
  }),
  guestCount: z.string().refine((val) => {
    const num = parseInt(val, 10);
    return !isNaN(num) && num >= 0 && num <= 4;
  }, {
    message: "Le nombre d'accompagnants doit être entre 0 et 4",
  }),
  guestNames: z.array(z.string()).optional(),
  dietaryRestrictions: z.string().optional(),
  message: z.string().optional(),
});

type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

const RSVPForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [guestInputs, setGuestInputs] = useState<string[]>([]);

  const form = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      attending: "yes",
      guestCount: "0",
      guestNames: [],
      dietaryRestrictions: "",
      message: "",
    },
  });

  const watchAttending = form.watch("attending");
  const watchGuestCount = form.watch("guestCount");

  // Mettre à jour les inputs des invités lorsque le nombre change
  const updateGuestInputs = (count: number) => {
    if (count > 0) {
      const newInputs = Array(count).fill("");
      setGuestInputs(newInputs);
    } else {
      setGuestInputs([]);
    }
  };

  // Écouter le changement du nombre d'invités
  const onGuestCountChange = (value: string) => {
    form.setValue("guestCount", value);
    updateGuestInputs(parseInt(value, 10));
  };

  const onSubmit = async (data: RsvpFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Conversion des données pour Supabase
      const rsvpData = {
        name: data.name,
        email: data.email,
        attending: data.attending === "yes",
        guest_count: parseInt(data.guestCount, 10),
        dietary_restrictions: data.dietaryRestrictions || null,
        message: data.message || null,
      };
      
      // Insérer les données dans Supabase
      const { error } = await supabase
        .from("rsvps")
        .insert([rsvpData]);
      
      if (error) throw error;
      
      // Afficher un message de confirmation
      toast({
        title: "Réponse envoyée !",
        description: "Merci pour votre réponse, nous l'avons bien reçue.",
      });
      
      // Réinitialiser le formulaire et afficher un message de confirmation
      form.reset();
      setGuestInputs([]);
      setFormSubmitted(true);
      
    } catch (error) {
      console.error("Erreur lors de l'envoi du RSVP:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre réponse. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
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
            onClick={() => setFormSubmitted(false)}
            className="hover:bg-wedding-gold hover:text-white"
          >
            Soumettre une autre réponse
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom et Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom et prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="votre.email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="attending"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Serez-vous présent(e) ?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Oui, je serai présent(e)
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Non, je ne pourrai pas être présent(e)
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {watchAttending === "yes" && (
          <>
            <FormField
              control={form.control}
              name="guestCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre d'accompagnants</FormLabel>
                  <div className="flex items-center space-x-3">
                    <UserPlus className="text-gray-500" size={20} />
                    <FormControl>
                      <select
                        className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
                        onChange={(e) => onGuestCountChange(e.target.value)}
                        value={field.value}
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                      </select>
                    </FormControl>
                  </div>
                  <FormDescription>
                    Indiquez le nombre de personnes qui vous accompagneront.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {guestInputs.length > 0 && (
              <div className="space-y-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-medium text-lg flex items-center gap-2">
                  <Info size={18} /> Informations sur vos accompagnants
                </h3>
                {guestInputs.map((_, index) => (
                  <div key={index} className="space-y-2">
                    <label htmlFor={`guest-${index}`} className="block text-sm font-medium">
                      Nom de l'accompagnant {index + 1}
                    </label>
                    <Input
                      id={`guest-${index}`}
                      placeholder={`Nom et prénom de l'accompagnant ${index + 1}`}
                      onChange={(e) => {
                        const newGuestNames = [...guestInputs];
                        newGuestNames[index] = e.target.value;
                        setGuestInputs(newGuestNames);
                      }}
                      value={guestInputs[index]}
                    />
                  </div>
                ))}
              </div>
            )}

            <FormField
              control={form.control}
              name="dietaryRestrictions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Restrictions alimentaires</FormLabel>
                  <div className="flex items-center space-x-3">
                    <Utensils className="text-gray-500" size={20} />
                    <FormControl>
                      <Textarea
                        placeholder="Allergies, régimes spéciaux, etc."
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormDescription>
                    Merci de nous indiquer toutes restrictions alimentaires pour vous et vos accompagnants.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message pour les mariés</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Écrivez un message pour Marcelle & Stéphane..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Alert className="bg-wedding-gold/10 border-wedding-gold">
          <AlertDescription className="text-sm">
            Merci de confirmer votre présence avant le 15 mai 2024. Nous avons hâte de vous voir !
          </AlertDescription>
        </Alert>

        <div className="text-center">
          <Button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer ma réponse"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RSVPForm;
