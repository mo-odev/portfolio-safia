import { Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactNumberIntl = "213542505945";
const contactEmail = "zaouidisafia041@gmail.com";

const socials = [
  { icon: MessageCircle, href: `https://wa.me/${contactNumberIntl}`, label: "WhatsApp" },
  { icon: Send, href: `tg://resolve?phone=${contactNumberIntl}`, label: "Telegram" },
  { icon: Mail, href: `mailto:${contactEmail}`, label: "Email" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Subtle warm background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-beige to-background" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
        {/* Profile image */}
        <div className="relative mb-8">
          <img
            src="/assets/profile.jpg"
            alt="Portrait de Luméa Créatrice"
            width={176}
            height={176}
            loading="eager"
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-lg ring-4 ring-background"
            style={{ boxShadow: "var(--shadow-card)" }}
          />
        </div>

        {/* Bio */}
        <p className="text-sm font-medium tracking-[0.25em] uppercase text-muted-foreground mb-4">
          Luméa Créatrice • Créatrice de Vidéos UGC et Créatives
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-balance text-foreground">
          Créer des Histoires qui{" "}
          <span className="gradient-text">Convertissent</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
          Je crée du contenu vidéo UGC et créatif captivant qui stimule l'engagement et augmente les ventes pour les marques du monde entier.
        </p>

        {/* CTA */}
        <Button
          size="lg"
          className="rounded-full px-8 py-6 text-base font-semibold hover:scale-105 transition-all duration-300 shadow-lg"
          asChild
        >
          <a href="#contact">Travaillons Ensemble</a>
        </Button>

        {/* Socials */}
        <div className="flex items-center gap-4 mt-10">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.href.startsWith("http") || s.href.startsWith("tg://") ? "_blank" : undefined}
              rel={s.href.startsWith("http") || s.href.startsWith("tg://") ? "noopener noreferrer" : undefined}
              className="w-11 h-11 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary bg-card hover:bg-secondary transition-all duration-300"
              style={{ boxShadow: "var(--shadow-soft)" }}
            >
              <s.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/40">
        <span className="text-xs tracking-widest uppercase">Faites Défiler</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
