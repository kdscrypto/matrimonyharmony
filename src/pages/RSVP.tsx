
import { useState } from "react";
import RSVPForm from "@/components/RSVPForm";
import { Calendar } from "lucide-react";

const RSVP = () => {
  return (
    <div className="pt-24 pb-16">
      <div className="wedding-container">
        <h1 className="section-title mb-6">Répondez s'il vous plaît</h1>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          <div className="flex flex-col items-center text-center md:text-left max-w-md">
            <p className="text-lg font-medium mb-4 dark:text-white">
              Nous serions ravis de vous compter parmi nos invités pour célébrer notre union.
            </p>
            <div className="flex items-center gap-2 text-wedding-terracotta dark:text-wedding-gold font-semibold mb-2">
              <Calendar size={20} />
              <span>Date limite de réponse : 15 mai 2024</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Merci de nous faire savoir si vous pourrez être présents et si vous avez des restrictions alimentaires.
            </p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <RSVPForm />
        </div>

        <div className="max-w-3xl mx-auto mt-12 text-center">
          <h2 className="text-2xl font-playfair mb-4 dark:text-wedding-gold">Vous avez des questions ?</h2>
          <p className="mb-6 dark:text-white">
            N'hésitez pas à nous contacter directement :
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
            <div>
              <p className="font-medium dark:text-white">Marcelle</p>
              <p className="text-gray-600 dark:text-gray-300">marcelle@example.com</p>
              <p className="text-gray-600 dark:text-gray-300">06 12 34 56 78</p>
            </div>
            <div>
              <p className="font-medium dark:text-white">Stéphane</p>
              <p className="text-gray-600 dark:text-gray-300">stephane@example.com</p>
              <p className="text-gray-600 dark:text-gray-300">06 98 76 54 32</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSVP;
