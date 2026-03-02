export const siteConfig = {
  siteName: "Gianpiero Ferraro | Sviluppatore Siti Web",
  siteUrl: "https://gianpieroferraro.it",
  defaultTitle: "Sviluppatore siti web a Cosenza | React/Next.js freelance",
  defaultDescription:
    "Realizzazione siti web e SEO tecnico a Cosenza e in tutta Italia. Preventivo rapido per siti performanti orientati ai contatti.",
  defaultImage: "https://gianpieroferraro.it/gianpieroferraro.png",
  locale: "it_IT",
  twitterCard: "summary_large_image",
  phone: "+39XXXXXXXXXX",
  email: "gianpieroweno@hotmail.it"
};

export function toAbsoluteUrl(path = "/") {
  if (!path) return siteConfig.siteUrl;
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteConfig.siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
