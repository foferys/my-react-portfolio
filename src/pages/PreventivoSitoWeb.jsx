import SeoLandingPage from "../components/SeoLandingPage";
import { toAbsoluteUrl } from "../lib/seo";

export default function PreventivoSitoWeb() {
  const path = "/preventivo-sito-web";
  const faq = [
    {
      q: "Quanto costa un sito web professionale?",
      a: "Il costo dipende da obiettivi, numero pagine e integrazioni. Ricevi una stima dettagliata con range e tempi entro 24 ore."
    },
    {
      q: "Lavori solo in Calabria?",
      a: "No, opero in provincia di Cosenza e da remoto su tutto il territorio nazionale."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };

  return (
    <SeoLandingPage
      seo={{
        title: "Preventivo sito web",
        description:
          "Richiedi un preventivo sito web: analisi obiettivi, proposta tecnica e roadmap SEO per generare contatti.",
        path,
        jsonLd: [faqSchema]
      }}
      h1="Preventivo sito web rapido e orientato ai risultati"
      intro="Compila la richiesta e ricevi una proposta con costi, tempi e priorita tecniche per lanciare il sito senza sprechi."
      bullets={[
        "Stima costi con opzioni freelance o team esteso",
        "Roadmap SEO tecnico + contenuti + conversioni",
        "Priorita P0/P1/P2 con rischi e test"
      ]}
      faq={faq}
      breadcrumbs={[
        { name: "Home", url: toAbsoluteUrl("/") },
        { name: "Preventivo sito web", url: toAbsoluteUrl(path) }
      ]}
      source="landing_preventivo"
    />
  );
}
