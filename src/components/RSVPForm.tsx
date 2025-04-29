import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
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
import { UserPlus, Utensils, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GuestInputs from "./rsvp/GuestInputs";
import SuccessMessage from "./rsvp/SuccessMessage";
import { submitRsvp, getCSRFToken } from "@/services/rsvp.service";

// Schéma de validation amélioré pour le formulaire RSVP
const rsvpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }).max(100, {
    message: "Le nom ne doit pas dépasser 100 caractères",
  }).refine(val => /^[a-zA-ZÀ-ÿ\s'-]+$/.test(val), {
    message: "Le nom ne doit contenir que des lettres, espaces et caractères spéciaux valides",
  }),
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }).max(150, {
    message: "L'email ne doit pas dépasser 150 caractères",
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
  dietaryRestrictions: z.string().max(500, {
    message: "Les restrictions alimentaires ne doivent pas dépasser 500 caractères",
  }).optional(),
  message: z.string().max(1000, {
    message: "Le message ne doit pas dépasser 1000 caractères",
  }).optional(),
  csrfToken: z.string()
});

type RsvpFormValues = z.infer<typeof rsvpFormSchema>;

const RSVPForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [guestInputs, setGuestInputs] = useState<string[]>([]);
  const [submissionCount, setSubmissionCount] = useState(0);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string>("");

  // Générer un token CSRF lors du chargement du formulaire
  useEffect(() => {
    const token = getCSRFToken();
    setCsrfToken(token);
  }, []);

  // Vérifier si l'utilisateur est limité en termes de soumissions
  useEffect(() => {
    const rateLimit = localStorage.getItem("rsvp-rate-limit");
    if (rateLimit) {
      const { count, timestamp } = JSON.parse(rateLimit);
      const hourAgo = Date.now() - (60 * 60 * 1000);
      
      if (timestamp > hourAgo) {
        setSubmissionCount(count);
        setIsRateLimited(count >= 5);
      } else {
        // Réinitialiser si plus d'une heure s'est écoulée
        localStorage.removeItem("rsvp-rate-limit");
      }
    }
  }, []);

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
      csrfToken: ""
    },
  });

  // Mettre à jour le token CSRF dans le formulaire
  useEffect(() => {
    if (csrfToken) {
      form.setValue("csrfToken", csrfToken);
    }
  }, [csrfToken, form]);

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
  
  // Mettre à jour le rate limiting
  const updateRateLimit = () => {
    const now = Date.now();
    const rateLimit = localStorage.getItem("rsvp-rate-limit");
    
    let count = 1;
    if (rateLimit) {
      const data = JSON.parse(rateLimit);
      const hourAgo = now - (60 * 60 * 1000);
      
      if (data.timestamp > hourAgo) {
        count = data.count + 1;
      }
    }
    
    localStorage.setItem("rsvp-rate-limit", JSON.stringify({
      count,
      timestamp: now
    }));
    
    setSubmissionCount(count);
    setIsRateLimited(count >= 5);
    
    return count;
  };

  const onSubmit = async (data: RsvpFormValues) => {
    // Vérifier le rate limiting
    if (isRateLimited) {
      toast({
        title: "Limite atteinte",
        description: "Vous avez atteint le nombre maximum de soumissions. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Mettre à jour le rate limiting
      const submissionCount = updateRateLimit();
      if (submissionCount > 5) {
        toast({
          title: "Limite atteinte",
          description: "Vous avez atteint le nombre maximum de soumissions. Veuillez réessayer plus tard.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      // Conversion des données pour Supabase
      const rsvpData = {
        name: data.name,
        email: data.email,
        attending: data.attending === "yes",
        guest_count: parseInt(data.guestCount, 10),
        dietary_restrictions: data.dietaryRestrictions || null,
        message: data.message || null,
        csrf_token: data.csrfToken
      };
      
      // Insérer les données dans Supabase
      await submitRsvp(rsvpData);
      
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
      let errorMessage = "Une erreur est survenue lors de l'envoi de votre réponse. Veuillez réessayer.";
      
      // Afficher un message d'erreur plus précis si disponible
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      });
      
      // Générer un nouveau token CSRF en cas d'erreur
      const newToken = getCSRFToken();
      setCsrfToken(newToken);
      form.setValue("csrfToken", newToken);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return <SuccessMessage resetForm={() => setFormSubmitted(false)} />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {isRateLimited && (
          <Alert variant="destructive" className="mb-4">
            <Shield className="h-4 w-4 mr-2" />
            <AlertDescription>
              Vous avez atteint le nombre maximum de soumissions. Veuillez réessayer plus tard.
            </AlertDescription>
          </Alert>
        )}
      
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

        <input type="hidden" name="csrfToken" value={csrfToken} />

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

            <GuestInputs guestInputs={guestInputs} setGuestInputs={setGuestInputs} />

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
                        maxLength={500}
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
                  maxLength={1000}
                />
              </FormControl>
              <FormMessage />
              <FormDescription className="text-right text-xs">
                {field.value?.length || 0}/1000
              </FormDescription>
            </FormItem>
          )}
        />

        <Alert className="bg-wedding-gold/10 border-wedding-gold">
          <AlertDescription className="text-sm">
            Merci de confirmer votre présence avant le 15 mai 2025. Nous avons hâte de vous voir !
          </AlertDescription>
        </Alert>

        <div className="text-center">
          <Button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting || isRateLimited}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer ma réponse"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RSVPForm;
