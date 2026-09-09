# CV giocabile — direzione creativa

## Preferenza permanente dell'utente

Casa, oggetti e personaggio devono essere originali e distinguibili da Zelda. Non riutilizzare modelli, texture o animazioni del gioco e non riprodurli identici. Il protagonista deve essere un alieno carino. Questa scelta sostituisce la precedente prova con risorse estratte dalla ROM.

## Implementazione

La pagina /cv usa Three.js, caricato soltanto entrando nella pagina. Nessuna API o servizio a pagamento.

originalModels.js crea casa-studio, mobili e alieno tramite geometrie proprie: pavimento in ceramica, pareti salvia, finestra circolare, mobili pastello, alieno con antenne e tuta lilla. Camminata, respiro e occhi sono animati in codice. Non occorrono GLB o texture esterne.

content.js contiene le quattro sezioni e i collegamenti ricavati dal portfolio. Mancano date, ruoli dettagliati, formazione, certificazioni e PDF: non inventarli.

movement.js contiene collisioni e punti di interazione; mantenerli coerenti con i mobili. La tastiera agisce quando l'area di gioco ha il focus. Schede e lettura diretta mettono in pausa il personaggio. La versione testuale resta disponibile senza WebGL.

Gli esperimenti precedenti sono conservati solo nella cartella locale ignorata zelda/, esclusa dalla build.

## Verifiche

- npm run build
- node --test tests/cvMovement.test.js
- npx eslint src/cv src/pages/PlayableCv.jsx

Controllare anche tastiera, schede e viewport mobile nel browser. La suite generale ha un errore preesistente nel test del terminale dei gatti relativo alla frase sul sonno.
