# 🚀 My React Portfolio

<div align="center">
  <img src="public/logo.png" alt="Portfolio Logo" width="200"/>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
</div>

## 📋 Descrizione
Questo è il mio portfolio personale costruito con React e Vite. Un'applicazione moderna e performante che mostra i miei progetti, competenze ed esperienze.

## ✨ Caratteristiche
- ⚡ Performance ottimizzata con Vite
- 🎨 Design moderno e responsive
- 🔄 Hot Module Replacement (HMR)
- 📱 Mobile-first approach
- 🎯 SEO friendly
- 🖱️ Custom cursor con switch ON/OFF persistente

## 🛠️ Tecnologie Utilizzate
- React 18.3.1
- Vite 5.4.1
- React Router DOM 6.26.2
- Redux Toolkit 2.2.7
- Bootstrap 5.3.3
- GSAP 3.12.5
- Swiper 11.1.14
- Lenis Scroll 1.0.42
- React Unicons 2.0.2
- Howler.js 2.2.4

### 🛠️ Strumenti di Sviluppo
- ESLint 9.9.0
- TypeScript
- React Redux 9.1.2
- Popper.js 2.11.8

## 🚀 Come Iniziare

### Prerequisiti
- Node.js (versione 14.0.0 o superiore)
- npm o yarn

### Installazione

1. Clona il repository
```bash
git clone https://github.com/tuousername/my-react-portfolio.git
cd my-react-portfolio
```

2. Installa le dipendenze
```bash
npm install
# oppure
yarn install
```

3. Avvia il server di sviluppo
```bash
npm run dev
# oppure
yarn dev
```

4. Apri [http://localhost:5173](http://localhost:5173) nel tuo browser

## 📦 Script Disponibili

- `npm run dev` - Avvia il server di sviluppo
- `npm run build` - Compila il progetto per la produzione
- `npm run preview` - Anteprima della build di produzione
- `npm run lint` - Esegue il linting del codice
- `npm run format` - Formatta il codice con Prettier

## 🖱️ Gestione Custom Cursor
- È disponibile uno switch fisso in alto a destra per attivare/disattivare il cursore custom.
- Lo stato viene salvato in `localStorage` tramite la chiave `cursorEnabled`.
- Quando il cursore custom è attivo viene applicata la classe `html.cursor-enabled` e il cursore di sistema viene nascosto.
- Quando è disattivo il cursore di sistema torna immediatamente visibile senza side effects.
- Su dispositivi touch/coarse pointer e con `prefers-reduced-motion: reduce` il cursore custom è disabilitato di default.
- Lo switch è accessibile con tastiera e screen reader (`role="switch"`, `aria-checked`, `focus-visible`).

### ✅ Checklist Verifica Manuale
1. Apri il sito e verifica che lo switch compaia in alto a destra.
2. Imposta switch su ON e controlla che compaia il cursore tondo animato e sparisca la freccia di sistema.
3. Imposta switch su OFF e verifica ritorno immediato del cursore di sistema.
4. Ricarica la pagina e controlla che lo stato resti quello scelto.
5. Naviga tra `/`, `/3d`, `/project/:id` e verifica persistenza e comportamento coerente.
6. Con emulazione touch o `prefers-reduced-motion: reduce`, verifica che il custom cursor resti disattivato.

## 🏗️ Struttura del Progetto
```
my-react-portfolio/
├── public/          # Asset statici
├── src/             # Codice sorgente
│   ├── components/  # Componenti React
│   ├── pages/       # Pagine dell'applicazione
│   ├── styles/      # File CSS/SCSS
│   ├── utils/       # Utility functions
│   └── App.tsx      # Componente principale
├── index.html       # Entry point HTML
└── vite.config.js   # Configurazione Vite
```

## 🤝 Contribuire
Le contribuzioni sono benvenute! Per favore, segui questi passaggi:

1. Forka il progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Committa le tue modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Pusha al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## 📝 Licenza
Questo progetto è sotto la licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## 📧 Contatti
- Email: [foferys@gmail.com]
- LinkedIn: [https://www.linkedin.com/in/gianpiero-ferraro/]
- Portfolio: [https://gianpieroferraro.it/]

---
⭐️ Se ti piace questo progetto, non dimenticare di lasciare una stella!
