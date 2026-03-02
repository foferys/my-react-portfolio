import SeoLandingPage from "../components/SeoLandingPage";
import { toAbsoluteUrl } from "../lib/seo";

export default function SviluppatoreReactNextCosenza() {
  const path = "/sviluppatore-react-nextjs-cosenza";

  return (
    <SeoLandingPage
      seo={{
        title: "Sviluppatore React Next.js Cosenza",
        description:
          "Freelance React/Next.js a Cosenza per siti e web app SEO-friendly, performanti e pronti alla lead generation.",
        path,
        jsonLd: [
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Sviluppo React/Next.js",
            serviceType: "Sviluppatore React Next.js freelance",
            areaServed: ["Cosenza", "Calabria", "Italia"],
            url: toAbsoluteUrl(path)
          }
        ]
      }}
      h1="Sviluppatore React/Next.js freelance a Cosenza"
      intro="Sviluppo progetti React e Next.js con focus su rendering SEO, velocita e funnel di conversione."
      bullets={[
        "Migrazione da SPA CSR a SSR/SSG dove necessario",
        "SEO tecnico su routing, canonical, structured data",
        "Sviluppo componenti e pagine orientate a intent preventivo"
      ]}
      breadcrumbs={[
        { name: "Home", url: toAbsoluteUrl("/") },
        { name: "Sviluppatore React Next.js Cosenza", url: toAbsoluteUrl(path) }
      ]}
      source="landing_react_next"
    />
  );
}
