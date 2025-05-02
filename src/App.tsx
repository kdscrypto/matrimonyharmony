
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Details from "@/pages/Details";
import Gallery from "@/pages/Gallery";
import RSVP from "@/pages/RSVP";
import Admin from "@/pages/Admin";
import NotFound from "@/pages/NotFound";
import { useTheme } from "@/hooks/use-theme";
import { useEffect } from "react";
import AudioPlayer from "@/components/AudioPlayer";

const queryClient = new QueryClient();

// Composant ThemeContainer qui applique la classe "dark" au document
const ThemeContainer = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  
  // Effet pour appliquer la classe dark au document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <ThemeContainer>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/details" element={<Details />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/rsvp" element={<RSVP />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <AudioPlayer audioSrc="/assets/background-music.mp3" />
          </BrowserRouter>
        </ThemeContainer>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
