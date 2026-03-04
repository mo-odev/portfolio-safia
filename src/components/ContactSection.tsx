import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const encode = (data: Record<string, string>) => new URLSearchParams(data).toString();
const contactEmail = "zaouidisafia041@gmail.com";

const ContactSection = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const isLocalhost = ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
    const mailtoSubject = encodeURIComponent(`Nouveau message de ${form.name}`);
    const mailtoBody = encodeURIComponent(
      `Nom: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`,
    );
    const mailtoLink = `mailto:${contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;

    if (isLocalhost) {
      window.location.href = mailtoLink;
      toast({
        title: "Mode local",
        description: "Le formulaire Netlify fonctionne après déploiement. Ouverture de votre application email.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          ...form,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      toast({ title: "Message envoye !", description: "Merci. Votre message a bien ete recu." });
      setForm({ name: "", email: "", message: "" });
    } catch {
      window.location.href = mailtoLink;
      toast({
        title: "Envoi via email",
        description: "Le formulaire n'est pas disponible ici. Ouverture de votre application email.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 bg-beige">
      <div className="max-w-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4 text-foreground">
          Restons en <span className="gradient-text">Contact</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto">
          Vous avez un projet en tete ? Laissez-moi un message et creons quelque chose d'extraordinaire ensemble.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="soft-card p-6 md:p-8 space-y-5"
        >
          <input type="hidden" name="form-name" value="contact" />
          <input type="hidden" name="bot-field" />
          <div>
            <Input
              name="name"
              placeholder="Votre Nom"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="bg-secondary/50 border-0 h-12 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <Input
              name="email"
              type="email"
              placeholder="Votre Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="bg-secondary/50 border-0 h-12 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div>
            <Textarea
              name="message"
              placeholder="Votre Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="bg-secondary/50 border-0 focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full rounded-xl h-12 font-semibold hover:scale-[1.02] transition-all duration-300 shadow-md"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Envoi en cours..." : "Envoyer un Message"}
          </Button>
        </form>

        {/* Contact Methods */}
        <div className="mt-8 pt-8 border-t border-primary/10">
          <p className="text-center text-muted-foreground mb-6 text-sm">
            Ou contactez-moi directement via
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="https://wa.me/213542505945"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 hover:text-green-700 transition-all duration-300 border border-green-500/30 hover:border-green-500/50 font-medium"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href="tg://resolve?phone=213542505945"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 hover:text-blue-700 transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50 font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              Telegram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
