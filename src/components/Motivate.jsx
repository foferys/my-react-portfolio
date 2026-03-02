import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { ClickTermCatContext } from "../store/ClickTermCatProvider";

function Motivate() {
  const [keyWord, setkeyWord] = useState("");
  const [history, setHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fetching, setFetching] = useState(false);

  const catTerminal = useRef(null);
  const terminalOutput = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    gsap.fromTo(
      catTerminal.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: "Power2.easeInOut"
      }
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      catTerminal.current,
      { opacity: 1 },
      {
        opacity: 0,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".third-box",
          scrub: true
        }
      }
    );
  });

  useEffect(() => {
    if (terminalOutput.current) {
      terminalOutput.current.scrollTop = terminalOutput.current.scrollHeight;
    }
  }, [history, fetching, isExpanded]);

  const pushLine = (text, type = "result") => {
    setHistory((prev) => [...prev, { text, type }]);
  };

  const resolveCdTarget = (targetRaw) => {
    const target = (targetRaw || "").trim();

    if (!target || target === "~") return "/";

    if (target === "..") {
      const segments = location.pathname.split("/").filter(Boolean);
      if (!segments.length) return "/";
      segments.pop();
      return `/${segments.join("/")}`;
    }

    if (target.startsWith("/")) return target;
    return `/${target}`;
  };

  const canNavigateTo = (path) => {
    if (path === "/" || path === "/3d") return true;
    return /^\/project\/[^/]+$/.test(path);
  };

  const fetchCatFact = async () => {
    const query = keyWord.trim();
    const command = query.toLowerCase();

    if (!query) return;

    pushLine(`cat@facts: ~$ ${query}`, "command");

    if (command === "clear" || command === "cls") {
      setHistory([]);
      setkeyWord("");
      return;
    }

    if (command === "exit") {
      setIsExpanded(false);
      setkeyWord("");
      return;
    }

    if (command === "pwd") {
      pushLine(`/Users/fofe/my-react-portfolio${location.pathname}`);
      setkeyWord("");
      setIsExpanded(true);
      return;
    }

    if (command === "man" || command.startsWith("man ")) {
      pushLine(`CAT TERMINAL MANUAL
      Comandi disponibili:
      - man           mostra questa guida
      - pwd           mostra posizione attuale (workspace + route)
      - ls            mostra file/cartelle principali del progetto
      - cd <path>     naviga tra pagine del sito
                    path validi: /, /3d, /project/<id>, ..
                    esempi: cd /   | cd /3d   | cd /project/1   | cd ..
      - clear / cls   pulisce tutta la schermata terminale

      Uso libero:
      - Scrivi una frase sui gatti (es: "cats sleep", "fusa gatto", "gatti curiosi")
        e il terminale restituisce una risposta dal motore cat-facts.`);
      setkeyWord("");
      return;
    }

    if (command === "ls") {
      pushLine("src  public  tests  package.json  vite.config.js");
      setkeyWord("");
      setIsExpanded(true);
      return;
    }

    if (command.startsWith("cd")) {
      const cdArg = query.slice(2).trim();
      const destination = resolveCdTarget(cdArg);
      if (!canNavigateTo(destination)) {
        pushLine("Percorso non valido. Usa: /, /3d oppure /project/<id>", "error");
        setkeyWord("");
        return;
      }
      navigate(destination);
      pushLine(`Spostamento su: ${destination}`);
      setkeyWord("");
      return;
    }

    if (query.length > 140) {
      pushLine("Input troppo lungo. Mantieni la richiesta sotto i 140 caratteri.", "error");
      setkeyWord("");
      return;
    }

    try {
      setFetching(true);

      // The endpoint returns { data: [text] } to keep UI compatibility with the previous provider shape.
      const response = await fetch(`/api/cat-facts?q=${encodeURIComponent(query)}`);
      const jsonData = await response.json();

      if (!response.ok) {
        const fallback = jsonData?.error || "Errore durante la richiesta";
        pushLine(fallback, "error");
        return;
      }

      pushLine(jsonData?.data?.[0] || "No relevant fact found.");
      setkeyWord("");
    } catch (error) {
      pushLine("Servizio momentaneamente non disponibile.", "error");
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await fetchCatFact();
    }
  };

  const handleChange = (e) => {
    setkeyWord(e.target.value);
  };

  const { setTerminalClicked } = useContext(ClickTermCatContext);

  const clickTerminal = () => {
    setTerminalClicked("si");
    setIsExpanded(true);
  };

  const handleCloseTerminal = () => {
    setIsExpanded(false);
    setkeyWord("");
    setHistory([]);
  };

  const handleMinimizeTerminal = () => {
    setIsExpanded(false);
  };

  const handleExpandTerminal = () => {
    setIsExpanded(true);
  };

  return (
    <>
      <div id="fraseMotivazionale" ref={catTerminal}>
        {!isExpanded ? (
          <button type="button" className="terminalLauncherLine" onClick={clickTerminal} aria-label="Apri terminale">
            <span className="text-success">cat@facts</span>: ~$
          </button>
        ) : (
          <div className="catmodal is-expanded">
            <div className="catmodal-header">
              <div className="catmodal-actions">
                {/* Tre controlli macOS: close, minimize, maximize */}
                <button type="button" className="terminal-dot terminal-dot--close" onClick={handleCloseTerminal} aria-label="Chiudi terminale"></button>
                <button type="button" className="terminal-dot terminal-dot--minimize" onClick={handleMinimizeTerminal} aria-label="Minimizza terminale"></button>
                <button type="button" className="terminal-dot terminal-dot--maximize" onClick={handleExpandTerminal} aria-label="Espandi terminale"></button>
              </div>
              <span className="catmodal-title">cat@facts — zsh</span>
            </div>

            <div className="catmodal-body">
              <div className="terminalHistory" ref={terminalOutput}>
                {history.length === 0 && !fetching ? (
                  <p className="terminalLine terminalHint">Scrivi un comando (pwd / ls / clear / cls) o una query sui gatti.</p>
                ) : null}

                {history.map((line, index) => (
                  <p key={`${line.type}-${index}`} className={`terminalLine terminalLine--${line.type}`}>
                    {line.text}
                  </p>
                ))}

                {fetching ? (
                  <div className="terminalLoading" role="status">
                    <div className="spinner-grow spinner-grow-sm text-light">
                      <span className="sr-only"></span>
                    </div>
                    <span>Elaborazione...</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="terminalCont terminalCont-expanded">
              <div className="catTerminalInput">
                <span className="text-success">cat@facts</span>: ~$
              </div>
              <input
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                type="text"
                id="catTerminal"
                value={keyWord}
                autoFocus
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Motivate;
