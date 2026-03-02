import { useEffect } from "react";
import { siteConfig, toAbsoluteUrl } from "../lib/seo";

function upsertMeta(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("meta");
    document.head.appendChild(tag);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
}

function upsertLink(selector, attrs) {
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement("link");
    document.head.appendChild(tag);
  }
  Object.entries(attrs).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });
}

export default function SeoHead({
  title,
  description,
  path = "/",
  image,
  type = "website",
  robots = "index,follow",
  jsonLd
}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Gianpiero Ferraro` : siteConfig.defaultTitle;
    const finalDescription = description || siteConfig.defaultDescription;
    const canonical = toAbsoluteUrl(path);
    const ogImage = image || siteConfig.defaultImage;

    document.title = fullTitle;
    document.documentElement.setAttribute("lang", "it");

    upsertMeta('meta[name="description"]', { name: "description", content: finalDescription });
    upsertMeta('meta[name="robots"]', { name: "robots", content: robots });

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: fullTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: finalDescription });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: ogImage });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: siteConfig.locale });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: siteConfig.twitterCard });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: fullTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: finalDescription });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: ogImage });

    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonical });

    const existingJsonLd = document.getElementById("seo-json-ld");
    if (existingJsonLd) existingJsonLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "seo-json-ld";
      script.type = "application/ld+json";
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, path, image, type, robots, jsonLd]);

  return null;
}
