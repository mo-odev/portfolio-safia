import HeroSection from "@/components/HeroSection";
import VideoShowcase from "@/components/VideoShowcase";
import AdCreativesSection from "@/components/AdCreativesSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <VideoShowcase />
      <AdCreativesSection />
      <ContactSection />

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border/50 text-center">
        <p className="text-xs text-muted-foreground">
          © 2026 Safia Zdi. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
};

export default Index;
