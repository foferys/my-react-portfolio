import { useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLocation, useNavigate } from "react-router-dom";
import { ClickTermCatContext } from "../store/ClickTermCatProvider";
import { findBestFact } from "../utils/catFactsEngine";
import localCatFacts from "../data/localCatFacts.json";

function TerminalPrompt({ pathSuffix = "", showArrow = true }) {
  const basePath = "~ /REACT/fofe";
  const resolvedPath = `${basePath}${pathSuffix && pathSuffix !== "/" ? pathSuffix : ""}`;

  return (
    <span className="terminalPromptShell">
      <span className="terminalPromptPath">{resolvedPath}</span>
      <span className="terminalPromptSep">|</span>
      <span className="terminalPromptOn">on</span>
      <span className="terminalPromptBranch">main</span>
      {showArrow ? <span className="terminalPromptArrow">❯</span> : null}
    </span>
  );
}

function Motivate() {
  const [keyWord, setkeyWord] = useState("");
  const [history, setHistory] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);
  const [gitStaged, setGitStaged] = useState(false);
  const [gitCommitCount, setGitCommitCount] = useState(1);

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
    setHistory((prev) => [...prev, { text, type, path: location.pathname }]);
  };

  const pushCommandLine = (commandText) => {
    setHistory((prev) => [...prev, { type: "command", text: commandText, path: location.pathname }]);
  };

  const handleGitCommand = (query) => {
    const gitInput = query.trim();
    const gitSub = gitInput.replace(/^git\s+/, "").trim().toLowerCase();

    if (!gitSub) {
      pushLine("usage: git <command> [<args>]", "git-info");
      return true;
    }

    if (gitSub === "status") {
      if (!searchedItems.length) {
        pushLine("On branch main\nnothing to commit, working tree clean", "git-info");
        return true;
      }

      if (gitStaged) {
        const staged = searchedItems.map((item) => `\tnew file:   searched: ${item.query}/${item.answer}`).join("\n");
        pushLine(`On branch main\nChanges to be committed:\n  (use "git restore --staged <file>..." to unstage)\n${staged}`, "git-info");
        return true;
      }

      const modified = searchedItems.map((item) => `\tmodified:   searched: ${item.query}/${item.answer}`).join("\n");
      pushLine(`On branch main\nChanges not staged for commit:\n  (use "git add <file>..." to update what will be committed)\n${modified}`, "git-warn");
      return true;
    }

    if (gitSub === "add ." || gitSub.startsWith("add ")) {
      if (!searchedItems.length) {
        pushLine("fatal: pathspec did not match any searchable results", "git-warn");
        return true;
      }
      setGitStaged(true);
      return true;
    }

    if (gitSub.startsWith("commit")) {
      if (!searchedItems.length) {
        pushLine("On branch main\nnothing to commit, working tree clean", "git-info");
        return true;
      }
      if (!gitStaged) {
        pushLine("no changes added to commit (use \"git add\" and/or \"git commit -a\")", "git-warn");
        return true;
      }

      const hasMessage = /-m\s+["'].+["']/.test(gitInput);
      const message = hasMessage ? gitInput.match(/-m\s+["'](.+)["']/)?.[1] : "update searched entries";
      const filesCount = searchedItems.length;

      setGitCommitCount((prev) => prev + 1);
      setGitStaged(false);
      setSearchedItems([]);
      pushLine(`[main ${Math.random().toString(16).slice(2, 9)}] ${message}\n ${filesCount} file changed`, "git-info");
      return true;
    }

    if (gitSub === "log" || gitSub.startsWith("log ")) {
      const latest = `commit ${Math.random().toString(16).slice(2, 9)}\nAuthor: cat-terminal <cat@facts.local>\nDate:   ${new Date().toString()}\n\n    searched results snapshot`;
      const base = `commit 0000001\nAuthor: cat-terminal <cat@facts.local>\nDate:   ${new Date().toString()}\n\n    initial commit`;
      pushLine(gitCommitCount > 1 ? `${latest}\n\n${base}` : base, "git-info");
      return true;
    }

    if (gitSub === "branch" || gitSub === "branch -a") {
      pushLine("* main", "git-info");
      return true;
    }

    if (gitSub.startsWith("checkout")) {
      if (gitSub.includes("main")) {
        pushLine("Already on 'main'", "git-info");
      } else {
        pushLine("error: pathspec did not match any branch in this terminal", "git-warn");
      }
      return true;
    }

    if (gitSub === "diff") {
      if (!searchedItems.length) {
        pushLine("", "git-info");
        return true;
      }
      const diffRows = searchedItems
        .map((item) => `- searched: ${item.query}\n+ searched: ${item.query}/${item.answer}`)
        .join("\n");
      pushLine(`diff --git a/searched.log b/searched.log\n${diffRows}`, "git-warn");
      return true;
    }

    if (gitSub === "push" || gitSub.startsWith("push ")) {
      pushLine("Everything up-to-date", "git-info");
      return true;
    }

    if (gitSub === "pull" || gitSub.startsWith("pull ")) {
      pushLine("Already up to date.", "git-info");
      return true;
    }

    pushLine(`git: '${gitSub.split(" ")[0]}' is not a git command. See 'man'.`, "git-warn");
    return true;
  };

  const getLocalFallbackAnswer = (query) => {
    try {
      const best = findBestFact(query, localCatFacts);
      return best?.text || "No relevant fact found.";
    } catch (error) {
      console.error("[cat-facts] local fallback error", error);
      return "Servizio momentaneamente non disponibile.";
    }
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

    pushCommandLine(query);

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
      - git <cmd>     simula git (status/add/commit/log/branch/diff/push/pull)
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

    if (command.startsWith("git")) {
      handleGitCommand(query);
      setkeyWord("");
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
      const contentType = response.headers.get("content-type") || "";
      const hasJson = contentType.includes("application/json");
      const jsonData = hasJson ? await response.json() : null;

      if (!response.ok || !jsonData) {
        // Fallback locale: evita errori lato utente quando API/hosting/rete non raggiungono il backend.
        const fallbackAnswer = getLocalFallbackAnswer(query);
        pushLine(fallbackAnswer);
        setSearchedItems((prev) => [...prev, { query, answer: fallbackAnswer }]);
        return;
      }

      pushLine(jsonData?.data?.[0] || "No relevant fact found.");
      setSearchedItems((prev) => [...prev, { query, answer: jsonData?.data?.[0] || "No relevant fact found." }]);
      setkeyWord("");
    } catch (error) {
      const fallbackAnswer = getLocalFallbackAnswer(query);
      pushLine(fallbackAnswer);
      setSearchedItems((prev) => [...prev, { query, answer: fallbackAnswer }]);
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
            <span className="terminalLauncherMiniPath">~/</span>
            <span className="terminalLauncherHoverPath">/REACT/fofe</span>
            <span className="terminalPromptArrow">❯</span>
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
                  line.type === "command" ? (
                    <p key={`${line.type}-${index}`} className="terminalLine terminalLine--command">
                      <TerminalPrompt pathSuffix={line.path} />
                      <span className="terminalCmdText">{line.text}</span>
                    </p>
                  ) : (
                    <p key={`${line.type}-${index}`} className={`terminalLine terminalLine--${line.type}`}>
                      {line.text}
                    </p>
                  )
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
                <TerminalPrompt pathSuffix={location.pathname} />
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
