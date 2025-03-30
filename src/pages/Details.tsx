
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Utensils, 
  Music, 
  Gift, 
  Shirt 
} from "lucide-react";

const Details = () => {
  const events = [
    {
      title: "Cérémonie",
      time: "15h00 - 16h30",
      description: "Cérémonie laïque dans les jardins du château",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Cocktail",
      time: "16h30 - 19h00",
      description: "Vin d'honneur et animations sur la terrasse",
      icon: <Utensils className="w-6 h-6" />
    },
    {
      title: "Dîner",
      time: "19h30 - 22h00",
      description: "Repas gastronomique dans la salle de réception",
      icon: <Utensils className="w-6 h-6" />
    },
    {
      title: "Soirée dansante",
      time: "22h00 - 03h00",
      description: "Ouverture du bal par les mariés suivie de la fête",
      icon: <Music className="w-6 h-6" />
    }
  ];

  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-12">Informations Pratiques</h1>

        {/* Date et lieu */}
        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="flex items-center mb-4">
                <Calendar className="w-6 h-6 text-wedding-gold mr-2" />
                <h3 className="text-2xl font-playfair">Date</h3>
              </div>
              <p className="text-lg">Samedi 15 Juin 2024</p>
            </div>

            <div className="mb-6 md:mb-0 md:mr-8">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-wedding-gold mr-2" />
                <h3 className="text-2xl font-playfair">Heure</h3>
              </div>
              <p className="text-lg">Cérémonie à 15h00</p>
            </div>

            <div>
              <div className="flex items-center mb-4">
                <MapPin className="w-6 h-6 text-wedding-gold mr-2" />
                <h3 className="text-2xl font-playfair">Lieu</h3>
              </div>
              <p className="text-lg">Château de Villette</p>
              <p className="text-sm text-gray-600">3 Rue de la Villette, 75019 Paris</p>
            </div>
          </div>
        </section>

        {/* Programme */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-playfair text-center mb-10">Programme de la Journée</h2>
          
          <div className="relative">
            {/* Ligne verticale */}
            <div className="absolute left-16 top-0 bottom-0 w-0.5 bg-wedding-gold"></div>
            
            {/* Events */}
            <div className="space-y-8">
              {events.map((event, index) => (
                <div key={index} className="flex">
                  <div className="w-32 flex-shrink-0 flex justify-center">
                    <div className="w-12 h-12 bg-wedding-gold text-white rounded-full flex items-center justify-center z-10">
                      {event.icon}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-6 flex-grow">
                    <h3 className="text-xl font-playfair mb-2">{event.title}</h3>
                    <p className="text-wedding-gold font-medium mb-2">{event.time}</p>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dress Code */}
        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="flex items-center mb-6">
            <Shirt className="w-6 h-6 text-wedding-gold mr-2" />
            <h2 className="text-2xl font-playfair">Dress Code</h2>
          </div>
          <p className="text-gray-700 mb-4">
            Tenue élégante demandée. La cérémonie et la réception auront lieu en extérieur et en intérieur.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-wedding-beige bg-opacity-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Pour les hommes</h4>
              <p>Costume ou ensemble veste-pantalon de couleurs claires à moyennes.</p>
            </div>
            <div className="bg-wedding-beige bg-opacity-50 p-4 rounded-md">
              <h4 className="font-medium mb-2">Pour les femmes</h4>
              <p>Robe ou ensemble élégant. Toutes les couleurs sont les bienvenues sauf le blanc réservé à la mariée.</p>
            </div>
          </div>
        </section>

        {/* Hébergement */}
        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8 mb-12">
          <h2 className="text-2xl font-playfair mb-6">Hébergement</h2>
          <p className="text-gray-700 mb-6">
            Pour nos invités qui viennent de loin, nous avons négocié des tarifs préférentiels dans les hôtels suivants :
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium mb-2">Hôtel Particulier</h4>
              <p className="text-sm text-gray-600 mb-2">23 rue du Faubourg, 75008 Paris</p>
              <p className="text-sm">À 5 minutes à pied du lieu de réception</p>
              <p className="text-sm font-medium mt-2">Code promo : MARCELLE&STEPHANE</p>
            </div>
            <div className="border border-gray-200 rounded-md p-4">
              <h4 className="font-medium mb-2">Résidence du Parc</h4>
              <p className="text-sm text-gray-600 mb-2">45 avenue des Fleurs, 75019 Paris</p>
              <p className="text-sm">À 10 minutes en voiture du lieu de réception</p>
              <p className="text-sm font-medium mt-2">Code promo : MARCELLE&STEPHANE</p>
            </div>
          </div>
        </section>

        {/* Cadeaux */}
        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <Gift className="w-6 h-6 text-wedding-gold mr-2" />
            <h2 className="text-2xl font-playfair">Liste de Mariage</h2>
          </div>
          <p className="text-gray-700 mb-6">
            Votre présence à notre mariage est le plus beau des cadeaux. Cependant, 
            pour ceux qui souhaitent nous offrir un présent, nous avons créé une liste de mariage.
          </p>
          <div className="text-center">
            <a 
              href="#" 
              className="inline-block bg-wedding-gold text-white font-medium py-3 px-8 rounded-md transition-all duration-300 hover:bg-opacity-90"
            >
              Accéder à la liste de mariage
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Details;
