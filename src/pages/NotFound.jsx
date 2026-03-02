import { Link } from "react-router-dom";
import SeoHead from "../components/SeoHead";
import { toAbsoluteUrl } from "../lib/seo";

export default function NotFound() {
  return (
    <main className="container py-5" style={{ minHeight: "70vh" }}>
      <SeoHead
        title="Pagina non trovata"
        description="La pagina richiesta non e disponibile. Torna alla home o richiedi un preventivo."
        path="/404"
        robots="noindex,follow"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "404",
          url: toAbsoluteUrl("/404")
        }}
      />
      <h1>404 - Pagina non trovata</h1>
      <p>Il contenuto richiesto non e disponibile.</p>
      <p>
        <Link to="/">Torna alla home</Link> oppure <Link to="/preventivo-sito-web">richiedi un preventivo</Link>.
      </p>
    </main>
  );
}
