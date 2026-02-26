import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ClickTermCatContext } from "../store/ClickTermCatProvider";

function Motivate() {
  const [frase, setFrase] = useState("");
  const [keyWord, setkeyWord] = useState("");
  const [modalRest, setModalRest] = useState(false);
  const [fetching, setFetching] = useState(false);

  const catTerminal = useRef(null);

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

  const fetchCatFact = async () => {
    const query = keyWord.trim();

    if (!query) {
      setFrase('Inserisci una parola o frase (es: "sleep", "coda", "gatti curiosi").');
      return;
    }

    if (query.length > 140) {
      setFrase("Input troppo lungo. Mantieni la richiesta sotto i 140 caratteri.");
      return;
    }

    try {
      setFetching(true);

      // The endpoint returns { data: [text] } to keep UI compatibility with the previous provider shape.
      const response = await fetch(`/api/cat-facts?q=${encodeURIComponent(query)}`);
      const jsonData = await response.json();

      if (!response.ok) {
        const fallback = jsonData?.error || "Errore durante la richiesta";
        setFrase(fallback);
        return;
      }

      setFrase(jsonData?.data?.[0] || "No relevant fact found.");
      setkeyWord("");
    } catch (error) {
      setFrase("Servizio momentaneamente non disponibile.");
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

  const handleFocusOut = () => {
    if (!modalRest) {
      setFrase("");
    }
  };

  const handleRest = () => {
    setModalRest(true);
  };

  const handleLeave = () => {
    setModalRest(false);
    setFrase("");
  };

  const { setTerminalClicked } = useContext(ClickTermCatContext);

  const clickTerminal = () => {
    setTerminalClicked("si");
  };

  return (
    <>
      <div id="fraseMotivazionale" ref={catTerminal}>
        <p>
          {fetching ? (
            <div className="spinner-grow spinner-grow-sm" role="status">
              <span className="sr-only"></span>
            </div>
          ) : (
            ""
          )}
        </p>

        <div className={`catmodal ${(frase || modalRest) ? "" : "hidden"}`} onMouseMove={handleRest} onMouseLeave={handleLeave}>
          <p>{frase}</p>
        </div>

        <div className="terminalCont">
          <div className="catTerminalInput">
            <span className="text-success">cat@facts</span>: ~$
          </div>
          <input
            onBlur={handleFocusOut}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={clickTerminal}
            type="text"
            id="catTerminal"
            value={keyWord}
          />
        </div>
      </div>
    </>
  );
}

export default Motivate;
