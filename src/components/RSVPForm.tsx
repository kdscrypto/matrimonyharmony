
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const RSVPForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "0",
    dietaryRestrictions: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'envoi du formulaire
    console.log("Form submitted:", formData);
    
    // Afficher un message de confirmation
    toast({
      title: "Réponse envoyée !",
      description: "Merci pour votre réponse, nous l'avons bien reçue.",
    });
    
    // Réinitialiser le formulaire
    setFormData({
      name: "",
      email: "",
      attending: "yes",
      guests: "0",
      dietaryRestrictions: "",
      message: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="block font-medium">
            Nom et Prénom
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
            placeholder="Votre nom et prénom"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
            placeholder="votre.email@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="attending" className="block font-medium">
            Serez-vous présent(e) ?
          </label>
          <select
            id="attending"
            name="attending"
            value={formData.attending}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
          >
            <option value="yes">Oui, je serai présent(e)</option>
            <option value="no">Non, je ne pourrai pas être présent(e)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="guests" className="block font-medium">
            Nombre d'accompagnants
          </label>
          <select
            id="guests"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="dietaryRestrictions" className="block font-medium">
          Restrictions alimentaires
        </label>
        <input
          type="text"
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
          placeholder="Allergies, régime spécial, etc."
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block font-medium">
          Message pour les mariés
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wedding-gold"
          placeholder="Écrivez un message pour Marcelle & Stéphane..."
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn-primary">
          Envoyer ma réponse
        </button>
      </div>
    </form>
  );
};

export default RSVPForm;
