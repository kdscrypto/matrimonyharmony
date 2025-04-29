
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Vérifier si un thème est stocké dans le localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    // Vérifier si l'utilisateur préfère le mode sombre
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Utiliser le thème sauvegardé, sinon utiliser la préférence système, sinon light
    return savedTheme || (prefersDark ? 'dark' : 'light');
  });

  useEffect(() => {
    // Mettre à jour le localStorage quand le thème change
    localStorage.setItem('theme', theme);
    
    // Ajouter ou supprimer la classe 'dark' sur l'élément html
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return { theme, toggleTheme };
}
