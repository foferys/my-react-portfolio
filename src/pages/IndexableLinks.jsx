import { Link } from "react-router-dom";

const pages = [
  ["/realizzazione-siti-web-cosenza", "Realizzazione siti web Cosenza"],
  ["/sviluppatore-react-nextjs-cosenza", "Sviluppatore React/Next.js Cosenza"],
  ["/seo-tecnico-per-siti-react", "SEO tecnico per siti React"],
  ["/preventivo-sito-web", "Preventivo sito web"],
  ["/aree-servite-cosenza", "Aree servite Cosenza e Calabria"]
];

export default function IndexableLinks() {
  return (
    <section className="section watch">
      <div className="container">
        <h2 className="title mediafont_big">Servizi e landing SEO</h2>
        <p className="title">Pagine ottimizzate per richieste contatto e preventivo.</p>
        <ul className="title" style={{ listStyle: "disc", paddingLeft: "24px" }}>
          {pages.map(([path, label]) => (
            <li key={path}>
              <Link to={path}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
