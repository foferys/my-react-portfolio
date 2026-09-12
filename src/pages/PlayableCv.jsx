import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { chapters } from '../cv/content';
import { backpack } from '../cv/movement';
import { findBestFact } from '../utils/catFactsEngine';
import localCatFacts from '../data/localCatFacts.json';
import './PlayableCv.css';

export default function PlayableCv() {
  const navigate=useNavigate();
  const location=useLocation();
  const host = useRef(null), engine = useRef(null), dialog = useRef(null), returnFocus = useRef(null);
  const [status,setStatus]=useState('loading'), [error,setError]=useState(''), [near,setNear]=useState(null);
  const [selected,setSelected]=useState(null), [reading,setReading]=useState(false), [visited,setVisited]=useState([]), [exiting,setExiting]=useState(false);
  const [laptop,setLaptop]=useState(false);
  const openRef=useRef(null);
  const laptopRef=useRef(null);
  const exitRef=useRef(false);
  function openChapter(id) {
    returnFocus.current=document.activeElement;
    setSelected(id); setVisited(previous=>previous.includes(id)?previous:[...previous,id]);
  }
  openRef.current=openChapter;
  useEffect(()=>{
    const oldTitle=document.title; document.title='Il mio CV, una piccola avventura · Gianpiero Ferraro';
    let cancelled=false;
    import('../cv/createScene').then(({createScene})=>{
      if(cancelled) return;
      try { engine.current=createScene(host.current,{
        onReady:()=>setStatus('ready'), onNear:setNear, onOpen:id=>openRef.current(id),
        onLaptop:()=>setLaptop(true),
        onExit:()=>{if(!exitRef.current){exitRef.current=true;setExiting(true);}},
        onError:message=>{setError(message);setStatus('error');},
      }); } catch {setError('Il dispositivo non riesce ad avviare il gioco. Puoi leggere il CV qui sotto.');setStatus('error');}
    }).catch(()=>{if(!cancelled) {setError('Caricamento non riuscito. Puoi leggere il CV qui sotto.');setStatus('error');}});
    return ()=>{cancelled=true;engine.current?.dispose();engine.current=null;document.title=oldTitle;};
  },[]);
  useEffect(()=>{
    engine.current?.setPaused(Boolean(selected)||reading||laptop);
    if(selected) dialog.current?.showModal();
    else if(dialog.current?.open) dialog.current.close();
  },[selected,reading,laptop,status]);
  useEffect(()=>{
    if(reading) document.querySelector('.cv-reading')?.scrollIntoView({behavior:'instant',block:'start'});
  },[reading]);
  useEffect(()=>{
    if(!exiting) return undefined;
    const returnHome=window.setTimeout(()=>navigate('/'),900);
    return ()=>window.clearTimeout(returnHome);
  },[exiting,navigate]);
  function closeChapter() { setSelected(null); returnFocus.current?.focus(); }
  useEffect(()=>{
    if(laptop) laptopRef.current?.focus();
  },[laptop]);
  const chapter=chapters.find(c=>c.id===selected), nearby=chapters.find(c=>c.id===near) || (near===backpack.id ? backpack : null);
  const content=(entry)=><>
    <p className="cv-intro">{entry.intro}</p>
    {entry.paragraphs.map(text=><p key={text}>{text}</p>)}
    {entry.tags && <ul className="cv-tags">{entry.tags.map(tag=><li key={tag}>{tag}</li>)}</ul>}
    {entry.links && <div className="cv-links">{entry.links.map(link=><a key={link.url} href={link.url}>{link.label}</a>)}</div>}
    {entry.note && <p className="cv-note">{entry.note}</p>}
  </>;
  return <main className="cv-page">
    <header className="cv-header"><Link to="/" className="cv-back">← Portfolio</Link><span>GIANPIERO FERRARO <i> / </i> CV INTERATTIVO</span><button onClick={()=>setReading(value=>!value)}>{reading?'Torna alla casa':'Leggi il CV'} <span aria-hidden="true">↗</span></button></header>
    <section className="cv-layout" aria-busy={exiting}>
      <aside className="cv-sidebar">
        <p className="cv-eyebrow"><span /> DIARIO DI BORDO</p>
        <h1>FOFE<em> / 01</em></h1>
        <p className="cv-description">Gianpiero Ferraro<br/>Java Web Developer</p>
        <nav className="cv-chapters" aria-label="Sezioni del curriculum">
          {chapters.map(entry=><button key={entry.id} className={near===entry.id?'is-near':''} onClick={()=>openChapter(entry.id)}><span className="cv-number">{entry.number}</span><span><strong>{entry.title}</strong><small>{entry.object}</small></span><span className="cv-check" aria-label={visited.includes(entry.id)?'Visitato':'Da scoprire'}>{visited.includes(entry.id)?'✓':'↗'}</span></button>)}
        </nav>
        <p className="cv-progress">{String(visited.length).padStart(2,'0')} / 04 <span>storie scoperte</span></p>
      </aside>
      <div className="cv-world">
        <div className="cv-world-label"><span>AVAMPOSTO / PALUDE</span><span>01 — ESPLORAZIONE</span></div>
        <div ref={host} className="cv-canvas" tabIndex={0} aria-label="Area di gioco: clicca qui, poi usa WASD o frecce. E apre l'oggetto vicino." onPointerDown={()=>host.current?.focus()} />
        {exiting && <div className="cv-exit" role="status" aria-live="assertive"><div className="cv-exit-pixels" aria-hidden="true">{Array.from({length:20},(_,index)=><span key={index}/>)}</div><p>USCITA DALL&apos;AVAMPOSTO</p></div>}
        {status==='loading' && <div className="cv-loading" role="status"><span className="cv-loading-gem">◇</span>Caricamento avamposto…</div>}
        {status==='error' && <div className="cv-loading" role="alert"><p>{error}</p><button onClick={()=>setReading(true)}>Leggi il curriculum</button></div>}
        {status==='ready' && <div className="cv-interaction" aria-live="polite">{nearby?<button onClick={()=>engine.current?.interact()}><kbd>E</kbd> {nearby.title} <span>↗</span></button>:null}</div>}
        {laptop && <PixelLaptopModal modalRef={laptopRef} locationPath={location.pathname} navigate={navigate} onClose={()=>setLaptop(false)} />}
        <div className="cv-actions">
          <button title="Salto (Spazio)" aria-label="Salta" disabled={status!=='ready'||Boolean(selected)||reading||exiting} onClick={()=>engine.current?.jump()}>↥</button>
          <button title="Corsa (tieni premuto Shift)" aria-label="Corri" disabled={status!=='ready'||Boolean(selected)||reading||exiting}
            onPointerDown={event=>{event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);engine.current?.setDirection('shift',true);}}
            onPointerUp={()=>engine.current?.setDirection('shift',false)} onPointerCancel={()=>engine.current?.setDirection('shift',false)} onLostPointerCapture={()=>engine.current?.setDirection('shift',false)}
            onKeyDown={event=>{if(event.key===' '||event.key==='Enter'){event.preventDefault();engine.current?.setDirection('shift',true);}}}
            onKeyUp={()=>engine.current?.setDirection('shift',false)} onBlur={()=>engine.current?.setDirection('shift',false)}>»</button>
        </div>
        <div className="cv-controls"><div className="cv-dpad" aria-label="Comandi di movimento">{[['w','↑','Avanti'],['a','←','Sinistra'],['s','↓','Indietro'],['d','→','Destra']].map(([key,symbol,label])=><button key={key} className={`cv-dir-${key}`} aria-label={label} disabled={status!=='ready'||Boolean(selected)||reading||exiting} onPointerDown={event=>{event.preventDefault();event.currentTarget.setPointerCapture(event.pointerId);engine.current?.setDirection(key,true);}} onPointerUp={()=>engine.current?.setDirection(key,false)} onPointerCancel={()=>engine.current?.setDirection(key,false)} onLostPointerCapture={()=>engine.current?.setDirection(key,false)} onKeyDown={event=>{if(event.key===' '||event.key==='Enter'){event.preventDefault();engine.current?.setDirection(key,true);}}} onKeyUp={()=>engine.current?.setDirection(key,false)} onBlur={()=>engine.current?.setDirection(key,false)}>{symbol}</button>)}</div><p><b>W A S D</b> / frecce per muoverti<br/><b>E</b> per scoprire · oppure usa i pulsanti</p></div>
      </div>
    </section>
    {reading && <section className="cv-reading" aria-label="Curriculum in formato testo"><div className="cv-reading-heading"><p className="cv-eyebrow">IL PERCORSO, NERO SU BIANCO</p><h2>Gianpiero Ferraro</h2><p>Java Web Developer · Cosenza</p></div>{chapters.map(entry=><article key={entry.id}><span className="cv-eyebrow">{entry.number}</span><h3>{entry.title}</h3>{content(entry)}</article>)}</section>}
    <footer className="cv-footer"><span>SVILUPPO WEB, CURIOSITÀ E UN PIZZICO DI AVVENTURA.</span><a href="mailto:gianpieroweno@hotmail.it">Costruiamo qualcosa insieme ↗</a></footer>
    <dialog ref={dialog} className="cv-dialog" aria-labelledby="cv-dialog-title" onCancel={event=>{event.preventDefault();closeChapter();}} onClick={event=>{if(event.target===dialog.current)closeChapter();}}>
      {chapter && <article><div className="cv-dialog-top"><span className="cv-eyebrow">{chapter.number} / {chapter.object}</span><button autoFocus onClick={closeChapter} aria-label="Chiudi scheda">✕</button></div><h2 id="cv-dialog-title">{chapter.title}</h2>{content(chapter)}<button className="cv-return" onClick={closeChapter}>Continua a esplorare →</button></article>}
    </dialog>
  </main>;
}

function PixelPrompt({ pathSuffix='' }) {
  const resolvedPath=`~ /REACT/fofe${pathSuffix && pathSuffix !== '/' ? pathSuffix : ''}`;
  return <span className="cv-pixel-prompt"><span>{resolvedPath}</span><i>|</i><b>main</b><em>❯</em></span>;
}

PixelPrompt.propTypes = {
  pathSuffix: PropTypes.string,
};

function PixelLaptopModal({ modalRef, locationPath, navigate, onClose }) {
  const [terminalOpen,setTerminalOpen]=useState(false);
  const [command,setCommand]=useState('');
  const [history,setHistory]=useState([]);
  const output=useRef(null), input=useRef(null);
  useEffect(()=>{ output.current?.scrollTo({top:output.current.scrollHeight}); },[history,terminalOpen]);
  useEffect(()=>{ if(terminalOpen) window.setTimeout(()=>input.current?.focus(),80); },[terminalOpen]);
  function push(text,type='result') { setHistory(previous=>[...previous,{text,type}]); }
  function submit(event) {
    event.preventDefault();
    const query=command.trim();
    if(!query) return;
    const lower=query.toLowerCase();
    setHistory(previous=>[...previous,{text:query,type:'command'}]);
    setCommand('');
    if(lower==='clear'||lower==='cls') { setHistory([]); return; }
    if(lower==='exit') { setTerminalOpen(false); return; }
    if(lower==='pwd') { push(`/Users/fofe/my-react-portfolio${locationPath}`); return; }
    if(lower==='ls') { push('src  public  tests  package.json  vite.config.js  cv.pixel'); return; }
    if(lower==='man'||lower==='help') { push('Comandi: pwd, ls, clear, exit, cd /, cd /project/1. Puoi anche scrivere una frase sui gatti.'); return; }
    if(lower.startsWith('cd ')) {
      const target=query.slice(3).trim() || '/';
      if(target==='/' || target==='/3d' || /^\/project\/[^/]+$/.test(target)) {
        push(`Spostamento su: ${target}`);
        window.setTimeout(()=>navigate(target),220);
      } else push('Percorso non valido. Usa /, /3d o /project/<id>.','error');
      return;
    }
    try {
      push(findBestFact(query, localCatFacts)?.text || 'Nessun risultato locale trovato.');
    } catch {
      push('Archivio locale non disponibile.','error');
    }
  }
  return <div className="cv-laptop-overlay" role="dialog" aria-modal="true" aria-labelledby="cv-laptop-title" tabIndex={-1} ref={modalRef} onKeyDown={event=>{if(event.key==='Escape')onClose();}}>
    <div className="cv-laptop-shell">
      <div className="cv-laptop-bar"><span id="cv-laptop-title">FOFEBOOK / DESKTOP</span><button onClick={onClose} aria-label="Chiudi laptop">✕</button></div>
      <div className="cv-laptop-screen">
        <button className="cv-desktop-icon cv-desktop-icon--terminal" onClick={()=>setTerminalOpen(true)} aria-label="Apri terminale pixel">
          <span aria-hidden="true"><i /> <i /> <i /></span>
          <b>terminal</b>
        </button>
        <button className="cv-desktop-icon cv-desktop-icon--folder" onClick={()=>push('README.cv: movimento, web, pixel art, terminale.')} aria-label="Apri file README">
          <span aria-hidden="true"><i /> <i /></span>
          <b>readme</b>
        </button>
        <div className="cv-desktop-status"><span>PIXEL_OS 01</span><span>{new Date().toLocaleTimeString('it-IT',{hour:'2-digit',minute:'2-digit'})}</span></div>
        {terminalOpen && <section className="cv-pixel-terminal" aria-label="Terminale pixel">
          <div className="cv-pixel-terminal-head">
            <span>cat@facts - zsh</span>
            <div><button onClick={()=>setTerminalOpen(false)} aria-label="Minimizza terminale">_</button><button onClick={()=>{setTerminalOpen(false);setHistory([]);}} aria-label="Chiudi terminale">×</button></div>
          </div>
          <div className="cv-pixel-terminal-body" ref={output}>
            {!history.length && <p className="cv-pixel-line cv-pixel-hint">Scrivi `man`, `pwd`, `ls` o una query sui gatti.</p>}
            {history.map((line,index)=>line.type==='command'
              ? <p className="cv-pixel-line cv-pixel-command" key={`${line.text}-${index}`}><PixelPrompt pathSuffix={locationPath}/><span>{line.text}</span></p>
              : <p className={`cv-pixel-line cv-pixel-${line.type}`} key={`${line.text}-${index}`}>{line.text}</p>)}
          </div>
          <form className="cv-pixel-terminal-input" onSubmit={submit}>
            <PixelPrompt pathSuffix={locationPath}/>
            <input ref={input} value={command} onChange={event=>setCommand(event.target.value)} aria-label="Comando terminale pixel" />
          </form>
        </section>}
      </div>
    </div>
  </div>;
}

PixelLaptopModal.propTypes = {
  modalRef: PropTypes.shape({ current: PropTypes.object }),
  locationPath: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
