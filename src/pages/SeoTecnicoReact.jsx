import SeoLandingPage from "../components/SeoLandingPage";
import { toAbsoluteUrl } from "../lib/seo";

export default function SeoTecnicoReact() {
  const path = "/seo-tecnico-per-siti-react";

  return (
    <SeoLandingPage
      seo={{
        title: "SEO tecnico per siti React",
        description:
          "Audit e implementazione SEO tecnico su siti React: indicizzazione, rendering, CWV, schema.org e tracking lead.",
        path,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "SEO tecnico per siti React",
            serviceType: "Consulenza SEO tecnico",
            areaServed: ["Italia"],
            url: toAbsoluteUrl(path)
          }
        ]
      }}
      h1="SEO tecnico per siti React che non indicizzano"
      intro="Intervengo su rendering JS, crawling e segnali on-page per aumentare pagine indicizzate e lead organici."
      bullets={[
        "Diagnosi CSR/SSR/SSG con test ripetibili",
        "Fix su robots, sitemap, canonical, redirect e 404",
        "Setup dashboard KPI organici e conversioni"
      ]}
      breadcrumbs={[
        { name: "Home", url: toAbsoluteUrl("/") },
        { name: "SEO tecnico per siti React", url: toAbsoluteUrl(path) }
      ]}
      source="landing_seo_tecnico"
    />
  );
}
