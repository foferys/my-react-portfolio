import React, { useEffect, useRef, useState } from 'react';

const CURSOR_STORAGE_KEY = 'cursorEnabled';
const HOVER_TARGETS = 'a, button, [role="button"], input[type="button"], input[type="submit"]';

const canUseCustomCursor = () => {
  if (typeof window === 'undefined') return false;

  const isSmallViewport = window.matchMedia('(max-width: 768px)').matches;
  const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasTouchSupport = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  return !isSmallViewport && !hasCoarsePointer && !prefersReducedMotion && !hasTouchSupport;
};

const readStoredPreference = () => {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(CURSOR_STORAGE_KEY);
  const supported = canUseCustomCursor();

  if (stored === null) {
    return supported;
  }

  return stored === 'true' && supported;
};

const Cursor = () => {
  const cursorRef = useRef(null);
  const outlineRef = useRef(null);
  const [cursorEnabled, setCursorEnabled] = useState(readStoredPreference);
  const [cursorSupported, setCursorSupported] = useState(canUseCustomCursor);

  const isCursorActive = cursorEnabled && cursorSupported;

  useEffect(() => {
    const evaluateSupport = () => {
      const supported = canUseCustomCursor();
      setCursorSupported(supported);

      if (!supported) {
        setCursorEnabled(false);
      } else {
        const stored = localStorage.getItem(CURSOR_STORAGE_KEY);
        if (stored === 'true') {
          setCursorEnabled(true);
        }
      }
    };

    evaluateSupport();

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

    reducedMotionQuery.addEventListener('change', evaluateSupport);
    coarsePointerQuery.addEventListener('change', evaluateSupport);
    window.addEventListener('resize', evaluateSupport);

    return () => {
      reducedMotionQuery.removeEventListener('change', evaluateSupport);
      coarsePointerQuery.removeEventListener('change', evaluateSupport);
      window.removeEventListener('resize', evaluateSupport);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem(CURSOR_STORAGE_KEY, String(cursorEnabled));
  }, [cursorEnabled]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('cursor-enabled', isCursorActive);

    return () => {
      html.classList.remove('cursor-enabled');
    };
  }, [isCursorActive]);

  useEffect(() => {
    if (!isCursorActive) return;

    const cursor = cursorRef.current;
    const outline = outlineRef.current;
    if (!cursor || !outline) return;

    const handleMouseMove = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      cursor.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
      outline.style.transform = `translate(calc(${x}px - 50%), calc(${y}px - 50%))`;
    };

    const handleMouseOver = () => {
      outline.classList.add('hover');
    };

    const handleMouseLeave = () => {
      outline.classList.remove('hover');
    };

    document.addEventListener('mousemove', handleMouseMove);

    const targets = document.querySelectorAll(HOVER_TARGETS);
    targets.forEach((target) => {
      target.addEventListener('mouseover', handleMouseOver);
      target.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      targets.forEach((target) => {
        target.removeEventListener('mouseover', handleMouseOver);
        target.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isCursorActive]);

  const handleToggle = () => {
    if (!cursorSupported) return;
    setCursorEnabled((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        className="cursor-toggle"
        role="switch"
        aria-checked={isCursorActive}
        aria-label="Attiva o disattiva cursore custom"
        onClick={handleToggle}
        disabled={!cursorSupported}
      >
        <span className="cursor-toggle__label">Cursor</span>
        <span className={`cursor-toggle__track ${isCursorActive ? 'is-on' : ''}`} aria-hidden="true">
          <span className="cursor-toggle__thumb"></span>
        </span>
      </button>

      {isCursorActive && (
        <>
          <div ref={cursorRef} className="cursor"></div>
          <div ref={outlineRef} className="outline"></div>
        </>
      )}
    </>
  );
};

export default Cursor;
