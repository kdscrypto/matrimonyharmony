
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-8 md:mb-12">Notre Histoire</h1>

        <div className="max-w-4xl mx-auto">
          {/* Timeline with improved mobile responsiveness */}
          <div className="relative">
            {/* Vertical Line with better mobile alignment */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-wedding-gold"></div>

            {/* Timeline Items with improved spacing */}
            <div className="space-y-16 md:space-y-24">
              {/* First Meeting - 2021 */}
              <div className="relative">
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -mt-3 w-10 h-10 md:w-12 md:h-12 rounded-full bg-wedding-gold flex items-center justify-center text-white font-semibold text-sm md:text-base">
                  2021
                </div>
                <div className="flex flex-col md:flex-row items-start pl-20 md:pl-0">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-playfair mb-3 md:mb-4">Notre Rencontre</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      J'ai vu Stéphane sur le statut d'un de ses amis et ce qui m'a le plus frappé chez lui, 
                      c'était son élégance. Après échange de contacts, nous avons commencé à discuter à n'en 
                      point finir. Cette relation remplie de ses hauts et ses bas nous a confortés dans le 
                      choix de nos décisions.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-lg">
                      <img 
                        src="/lovable-uploads/b7f3518c-76ef-4d7d-8ea9-1e80a71c0a15.png" 
                        alt="Notre première rencontre" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* First Trip - 2022 */}
              <div className="relative">
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -mt-3 w-10 h-10 md:w-12 md:h-12 rounded-full bg-wedding-gold flex items-center justify-center text-white font-semibold text-sm md:text-base">
                  2022
                </div>
                <div className="flex flex-col md:flex-row items-start pl-20 md:pl-0">
                  <div className="md:w-1/2 md:pr-12 order-2 md:order-1">
                    <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                        alt="Notre amour grandit" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0 order-1 md:order-2">
                    <h3 className="text-xl md:text-2xl font-playfair mb-3 md:mb-4">Premier Voyage Ensemble</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Après plusieurs semaines d'échanges et de complicité, il a décidé de m'inviter à Edea 
                      pour une première rencontre. Cette escapade de 3 jours s'est transformée en une aventure 
                      mémorable, pleine de découvertes, de fous rires et de moments de tendresse, qui ont 
                      consolidé notre lien.
                    </p>
                  </div>
                </div>
              </div>

              {/* Proposal - 2023 */}
              <div className="relative">
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -mt-3 w-10 h-10 md:w-12 md:h-12 rounded-full bg-wedding-gold flex items-center justify-center text-white font-semibold text-sm md:text-base">
                  2023
                </div>
                <div className="flex flex-col md:flex-row items-start pl-20 md:pl-0">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="text-xl md:text-2xl font-playfair mb-3 md:mb-4">La Demande</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Après quatre années d'amour et de complicité, Stéphane a fait sa demande qu'il a 
                      accompagnée du mariage coutumier.
                    </p>
                  </div>
                  <div className="md:w-1/2 md:pl-12">
                    <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                        alt="La demande en mariage" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Wedding - 2025 */}
              <div className="relative">
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 -mt-3 w-10 h-10 md:w-12 md:h-12 rounded-full bg-wedding-gold flex items-center justify-center text-white font-semibold text-sm md:text-base">
                  2025
                </div>
                <div className="flex flex-col md:flex-row items-start pl-20 md:pl-0">
                  <div className="md:w-1/2 md:pr-12 order-2 md:order-1">
                    <div className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full overflow-hidden shadow-lg">
                      <img 
                        src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80" 
                        alt="Notre mariage" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:text-left mb-6 md:mb-0 order-1 md:order-2">
                    <h3 className="text-xl md:text-2xl font-playfair mb-3 md:mb-4">Notre Mariage</h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Nous sommes heureux de vous convier à notre mariage qui se tiendra le 17 mai 2025. 
                      Ce sera le début d'un nouveau chapitre de notre histoire, que nous sommes impatients 
                      d'écrire ensemble, entourés de toutes les personnes qui nous sont chères.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Us Section with improved mobile layout */}
        <section className="mt-24 md:mt-32">
          <h2 className="section-title mb-8 md:mb-12">Qui Sommes-Nous ?</h2>
          
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
            {/* Marcelle */}
            <div className="text-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mx-auto mb-4 md:mb-6 shadow-lg">
                <img 
                  src="/lovable-uploads/661db611-567d-4c7d-8233-50856f71e34d.png" 
                  alt="Marcelle" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-playfair mb-3">Steve Marcelle</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base px-4 md:px-0">
                Gendarme, elle adore la décoration intérieure et la pâtisserie. 
                Elle aime beaucoup les blagues et est très entourée de ceux qu'elle aime. 
                Son rire communicatif et sa joie de vivre illuminent le quotidien de Stéphane 
                depuis leur rencontre.
              </p>
            </div>

            {/* Stéphane */}
            <div className="text-center">
              <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mx-auto mb-4 md:mb-6 shadow-lg">
                <img 
                  src="/lovable-uploads/6afa8fcd-64b3-4137-af5b-9f1d51dd639d.png" 
                  alt="Stéphane" 
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-playfair mb-3">Stéphane</h3>
              <p className="text-gray-700 leading-relaxed text-sm md:text-base px-4 md:px-0">
                Gendarme, passionné de son travail, extraverti, sociable et travailleur. 
                Son calme, sa douceur et son esprit de famille ont conquis le cœur de Steve Marcelle. 
                Il aime les matchs de football, et aime organiser des surprises qui nourrissent 
                leur complicité.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
