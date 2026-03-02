import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav";
import SeoHead from "./SeoHead";
import LeadActions from "./LeadActions";

export default function SeoLandingPage({
  seo,
  h1,
  intro,
  bullets = [],
  faq = [],
  breadcrumbs = [],
  source = "landing"
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <>
      <SeoHead {...seo} jsonLd={[...(seo.jsonLd || []), breadcrumbSchema]} />
      <Navbar page3d={true} />
      <main className="container py-5" style={{ minHeight: "70vh", marginTop: "96px" }}>
        <h1 className="text-white mb-3">{h1}</h1>
        <p className="text-white-50">{intro}</p>
        <LeadActions source={source} />

        <section className="mt-4">
          <h2 className="text-white h4">Cosa ottieni</h2>
          <ul className="text-white-50">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        {faq.length > 0 ? (
          <section className="mt-4">
            <h2 className="text-white h4">FAQ</h2>
            {faq.map((item) => (
              <details key={item.q} className="text-white-50 mb-2">
                <summary>{item.q}</summary>
                <p className="mt-2 mb-0">{item.a}</p>
              </details>
            ))}
          </section>
        ) : null}
      </main>
      <BottomNav page3d={true} />
      <Footer />
    </>
  );
}
