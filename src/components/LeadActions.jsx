import { trackLeadEvent } from "../utils/analytics";

const whatsappUrl = "https://wa.me/393454079281?text=Vorrei%20un%20preventivo%20per%20un%20sito%20web";

export default function LeadActions({ source = "generic" }) {
  return (
    <div className="d-flex flex-wrap gap-2 my-3">
      <a
        className="btn btn-warning"
        href="mailto:gianpieroweno@hotmail.it?subject=Preventivo%20sito%20web"
        onClick={() => trackLeadEvent("form_submit", { source, method: "email" })}
      >
        Richiedi preventivo
      </a>
      <a
        className="btn btn-outline-light"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackLeadEvent("click_whatsapp", { source })}
      >
        WhatsApp
      </a>
      <a
        className="btn btn-outline-light"
        href="tel:+393454079281"
        onClick={() => trackLeadEvent("click_call", { source })}
      >
        Chiama ora
      </a>
    </div>
  );
}
