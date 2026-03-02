import SeoLandingPage from "../components/SeoLandingPage";
import { toAbsoluteUrl } from "../lib/seo";

export default function RealizzazioneSitiWebCosenza() {
  const path = "/realizzazione-siti-web-cosenza";
  const faq = [
    {
      q: "Quanto tempo serve per pubblicare il sito?",
      a: "Per un sito vetrina ottimizzato SEO il tempo medio e tra 2 e 4 settimane, in base a contenuti e complessita."
    },
    {
      q: "Fornisci anche SEO tecnico?",
      a: "Si, la struttura tecnica include meta, dati strutturati, performance e setup tracking conversioni."
    }
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Realizzazione siti web a Cosenza",
    serviceType: "Sviluppo siti web professionali",
    areaServed: ["Cosenza", "Calabria", "Italia"],
    provider: {
      "@type": "ProfessionalService",
      name: "Gianpiero Ferraro"
    },
    url: toAbsoluteUrl(path)
  };

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
        title: "Realizzazione siti web Cosenza",
        description:
          "Realizzazione siti web a Cosenza orientata ai contatti: performance, SEO tecnico e CTA per preventivo.",
        path,
        jsonLd: [serviceSchema, faqSchema]
      }}
      h1="Realizzazione siti web a Cosenza orientata ai contatti"
      intro="Creo siti web veloci e progettati per generare richieste di preventivo da traffico organico locale e nazionale."
      bullets={[
        "Architettura SEO e contenuti orientati alle keyword commerciali",
        "Setup conversioni (form, click WhatsApp, click chiamata)",
        "Ottimizzazione Core Web Vitals e velocita"
      ]}
      faq={faq}
      breadcrumbs={[
        { name: "Home", url: toAbsoluteUrl("/") },
        { name: "Realizzazione siti web Cosenza", url: toAbsoluteUrl(path) }
      ]}
      source="landing_realizzazione_cosenza"
    />
  );
}
