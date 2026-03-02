import SeoLandingPage from "../components/SeoLandingPage";
import { toAbsoluteUrl } from "../lib/seo";

export default function AreeServite() {
  const path = "/aree-servite-cosenza";

  return (
    <SeoLandingPage
      seo={{
        title: "Aree servite Cosenza e Calabria",
        description:
          "Servizi di sviluppo siti web e SEO tecnico per Cosenza, Rende, Castrolibero, Montalto Uffugo e tutta la Calabria.",
        path,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "Gianpiero Ferraro - Sviluppatore siti web",
            areaServed: ["Cosenza", "Rende", "Castrolibero", "Montalto Uffugo", "Corigliano-Rossano", "Calabria", "Italia"],
            url: toAbsoluteUrl(path)
          }
        ]
      }}
      h1="Aree servite: Cosenza, Calabria e tutta Italia"
      intro="Supporto aziende e professionisti locali con sviluppo siti web, SEO tecnico e ottimizzazione conversioni."
      bullets={[
        "Cosenza",
        "Rende",
        "Castrolibero",
        "Montalto Uffugo",
        "Corigliano-Rossano",
        "Reggio Calabria e resto d'Italia"
      ]}
      breadcrumbs={[
        { name: "Home", url: toAbsoluteUrl("/") },
        { name: "Aree servite", url: toAbsoluteUrl(path) }
      ]}
      source="landing_aree_servite"
    />
  );
}
