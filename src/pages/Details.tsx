
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Utensils, 
  Music, 
  Shirt,
  Church,
  Hotel
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const Details = () => {
  const isMobile = useIsMobile();
  
  const events = [
    {
      title: "Cérémonie Civile",
      time: "8h00",
      description: "Célébration civile à la mairie de Tsinga",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Cérémonie Religieuse",
      time: "14h00",
      description: "Célébration religieuse à la paroisse Notre Dame de la Paix du Lac (Messa Hygiène Mobile)",
      icon: <Church className="w-6 h-6" />
    },
    {
      title: "Cocktail & Dîner",
      time: "17h00",
      description: "Vin d'honneur, repas gastronomique et soirée dansante dans la salle de réception de la paroisse Notre Dame de la Paix du Lac",
      icon: <Utensils className="w-6 h-6" />
    }
  ];

  const hotels = [
    {
      name: "Hôtel Djeuga Palace",
      address: "Avenue Ahmadou Ahidjo, Yaoundé",
      distance: "5 minutes en voiture",
      price: "Prix moyen: 45 000 FCFA/nuit",
      description: "Hôtel 4 étoiles avec piscine et restaurant gastronomique"
    },
    {
      name: "Hilton Yaoundé",
      address: "Boulevard du 20 Mai, Yaoundé",
      distance: "10 minutes en voiture",
      price: "Prix moyen: 60 000 FCFA/nuit",
      description: "Grand hôtel de luxe avec vue panoramique sur la ville"
    },
    {
      name: "Résidence La Falaise",
      address: "Quartier Bastos, Yaoundé",
      distance: "8 minutes en voiture",
      price: "Prix moyen: 35 000 FCFA/nuit",
      description: "Résidence hôtelière confortable et calme"
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-wedding-beige dark:bg-gray-900 bg-opacity-30">
      <div className="wedding-container">
        <h1 className="section-title mb-12 text-wedding-burgundy dark:text-wedding-gold">Informations Pratiques</h1>

        {/* Date et lieu - Design amélioré */}
        <Card className="max-w-4xl mx-auto mb-12 border-wedding-gold shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-wedding-burgundy dark:bg-wedding-gold bg-opacity-10 flex items-center justify-center mb-3">
                    <Calendar className="w-7 h-7 text-wedding-burgundy dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-playfair dark:text-white">Date</h3>
                </div>
                <p className="text-lg dark:text-gray-200">Samedi 17 Mai 2025</p>
              </div>

              <div className="text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-wedding-burgundy dark:bg-wedding-gold bg-opacity-10 flex items-center justify-center mb-3">
                    <Clock className="w-7 h-7 text-wedding-burgundy dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-playfair dark:text-white">Heure</h3>
                </div>
                <p className="text-lg dark:text-gray-200">Cérémonie civile à 8h00</p>
              </div>

              <div className="text-center">
                <div className="flex flex-col items-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-wedding-burgundy dark:bg-wedding-gold bg-opacity-10 flex items-center justify-center mb-3">
                    <MapPin className="w-7 h-7 text-wedding-burgundy dark:text-white" />
                  </div>
                  <h3 className="text-2xl font-playfair dark:text-white">Lieu</h3>
                </div>
                <p className="text-lg dark:text-gray-200">Mairie de Tsinga</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">Yaoundé, Cameroun</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Programme - Design amélioré */}
        <section className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-playfair text-center mb-10 text-wedding-burgundy dark:text-wedding-gold">Programme de la Journée</h2>
          
          <div className="relative">
            {/* Ligne verticale - cachée sur mobile */}
            <div className={`absolute left-8 xs:left-16 top-6 bottom-6 w-0.5 bg-wedding-gold ${isMobile ? 'opacity-50' : ''}`}></div>
            
            {/* Events */}
            <div className="space-y-8">
              {events.map((event, index) => (
                <div key={index} className="flex">
                  <div className="w-16 xs:w-32 flex-shrink-0 flex justify-center">
                    <div className="w-12 h-12 bg-wedding-gold text-white rounded-full flex items-center justify-center z-10 shadow-md">
                      {event.icon}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 xs:p-6 flex-grow border-l-4 border-wedding-gold hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-playfair mb-2 text-wedding-burgundy dark:text-wedding-gold">{event.title}</h3>
                    <p className="text-wedding-gold dark:text-white font-medium mb-2">{event.time}</p>
                    <p className="text-gray-700 dark:text-gray-300">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dress Code - Design amélioré */}
        <Card className="max-w-4xl mx-auto mb-12 border-wedding-gold shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-wedding-burgundy dark:bg-wedding-gold bg-opacity-10 flex items-center justify-center mb-3">
                <Shirt className="w-7 h-7 text-wedding-burgundy dark:text-white" />
              </div>
              <h2 className="text-2xl font-playfair text-wedding-burgundy dark:text-wedding-gold">Dress Code</h2>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto">
              Tenue chic et élégante avec touche de terracotta pour célébrer notre union.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-wedding-beige dark:bg-gray-700 rounded-md p-6 shadow-inner">
                <h4 className="font-medium mb-4 text-wedding-burgundy dark:text-white text-center">Couleurs recommandées</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  <span className="inline-block px-3 py-1 bg-orange-700 text-white rounded-md">Orange brûlé</span>
                  <span className="inline-block px-3 py-1 bg-amber-800 text-white rounded-md">Marron</span>
                  <span className="inline-block px-3 py-1 bg-red-900 text-white rounded-md">Bordeaux</span>
                  <span className="inline-block px-3 py-1 bg-orange-500 text-white rounded-md">Orange vif</span>
                  <span className="inline-block px-3 py-1 bg-green-200 text-gray-800 rounded-md">Vert pastel</span>
                </div>
              </div>
              <div className="bg-wedding-beige dark:bg-gray-700 rounded-md p-6 shadow-inner">
                <h4 className="font-medium mb-4 text-wedding-burgundy dark:text-white text-center">Conseils</h4>
                <p className="text-center dark:text-gray-300">Les cérémonies auront lieu à la mairie puis à l'église. Pensez à une tenue confortable et élégante adaptée pour ces différents lieux et pour la chaleur camerounaise.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hébergement - Design amélioré et contenu actualisé */}
        <Card className="max-w-4xl mx-auto border-wedding-gold shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800">
          <CardContent className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-14 h-14 rounded-full bg-wedding-burgundy dark:bg-wedding-gold bg-opacity-10 flex items-center justify-center mb-3">
                <Hotel className="w-7 h-7 text-wedding-burgundy dark:text-white" />
              </div>
              <h2 className="text-2xl font-playfair text-wedding-burgundy dark:text-wedding-gold">Hébergement</h2>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-8 text-center max-w-2xl mx-auto">
              Pour nos invités qui viennent de loin, voici une sélection d'hôtels à proximité des lieux de célébration :
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {hotels.map((hotel, index) => (
                <div key={index} className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h4 className="font-playfair text-lg mb-3 text-wedding-burgundy dark:text-wedding-gold">{hotel.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{hotel.address}</p>
                  <p className="text-sm mb-2 font-medium text-wedding-gold">{hotel.distance}</p>
                  <p className="text-sm mb-3 dark:text-gray-200">{hotel.price}</p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 italic">{hotel.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>Mentionnez "Mariage Marcelle & Stéphane" lors de votre réservation pour bénéficier de nos tarifs négociés</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Details;
