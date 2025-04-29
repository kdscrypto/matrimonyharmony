
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Toggle } from "@/components/ui/toggle";

// Version avec Toggle pour une intégration plus discrète dans la navbar
export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Toggle 
      pressed={theme === 'dark'}
      onPressedChange={toggleTheme}
      aria-label="Basculer entre le mode clair et sombre"
      className="p-2 text-white"
    >
      {theme === 'dark' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Toggle>
  );
};

// Version avec Button pour une utilisation ailleurs dans l'interface
export const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full bg-transparent hover:bg-white/10 border-white/20"
    >
      {theme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
      )}
      <span className="sr-only">Basculer entre le mode clair et sombre</span>
    </Button>
  );
};
