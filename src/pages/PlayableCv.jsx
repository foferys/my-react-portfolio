import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { chapters } from '../cv/content';
import './PlayableCv.css';

export default function PlayableCv() {
  const navigate=useNavigate();
  const host = useRef(null), engine = useRef(null), dialog = useRef(null), returnFocus = useRef(null);
  const [status,setStatus]=useState('loading'), [error,setError]=useState(''), [near,setNear]=useState(null);
  const [selected,setSelected]=useState(null), [reading,setReading]=useState(false), [visited,setVisited]=useState([]), [exiting,setExiting]=useState(false);
  const openRef=useRef(null);
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
        onExit:()=>{if(!exitRef.current){exitRef.current=true;setExiting(true);}},
        onError:message=>{setError(message);setStatus('error');},
      }); } catch {setError('Il dispositivo non riesce ad avviare il gioco. Puoi leggere il CV qui sotto.');setStatus('error');}
    }).catch(()=>{if(!cancelled) {setError('Caricamento non riuscito. Puoi leggere il CV qui sotto.');setStatus('error');}});
    return ()=>{cancelled=true;engine.current?.dispose();engine.current=null;document.title=oldTitle;};
  },[]);
  useEffect(()=>{
    engine.current?.setPaused(Boolean(selected)||reading);
    if(selected) dialog.current?.showModal();
    else if(dialog.current?.open) dialog.current.close();
  },[selected,reading,status]);
  useEffect(()=>{
    if(reading) document.querySelector('.cv-reading')?.scrollIntoView({behavior:'instant',block:'start'});
  },[reading]);
  useEffect(()=>{
    if(!exiting) return undefined;
    const returnHome=window.setTimeout(()=>navigate('/'),900);
    return ()=>window.clearTimeout(returnHome);
  },[exiting,navigate]);
  function closeChapter() { setSelected(null); returnFocus.current?.focus(); }
  const chapter=chapters.find(c=>c.id===selected), nearby=chapters.find(c=>c.id===near);
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
