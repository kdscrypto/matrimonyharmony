
import RSVPForm from "@/components/RSVPForm";

const RSVP = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-6">Répondez s'il vous plaît</h1>
        <p className="text-center text-lg max-w-2xl mx-auto mb-12">
          Nous serions ravis de vous compter parmi nos invités pour célébrer notre union.
          Merci de confirmer votre présence avant le 15 mai 2024.
        </p>
        
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
          <RSVPForm />
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <h2 className="text-2xl font-playfair mb-4">Vous avez des questions ?</h2>
          <p className="mb-6">
            N'hésitez pas à nous contacter directement :
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div>
              <p className="font-medium">Marcelle</p>
              <p className="text-gray-600">marcelle@example.com</p>
              <p className="text-gray-600">06 12 34 56 78</p>
            </div>
            <div>
              <p className="font-medium">Stéphane</p>
              <p className="text-gray-600">stephane@example.com</p>
              <p className="text-gray-600">06 98 76 54 32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
