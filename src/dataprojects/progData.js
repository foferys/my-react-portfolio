
import eucare from '../img/eucare.png';
import eucare1 from '../img/eucarebeef/eucare1.jpg';
import eucare2 from '../img/eucarebeef/eucare2.mp4';
import eucare3 from '../img/eucarebeef/eucare3.jpg';
import eucare4 from '../img/eucarebeef/eucare4.jpg';
import eucare5 from '../img/eucarebeef/eucare5.jpg';
import eucare6 from '../img/eucarebeef/eucare6.jpg';
// --
import myWallett from '../img/mysmartwallet.jpg';
import olivicola from '../img/olivicola.png';
import bergamotto from '../img/bergamotto.png';
import galatro from '../img/galatro.jpg';
import primacom from '../img/primacom.png';
import bilanciophp from '../img/bilanciophp.jpg';
import ecomm from '../img/ecommerce.jpg';
//msw
import dashboard from '../img/myWallet/dashboard.png';
import wall1 from '../img/myWallet/wall1.png';
import wall2 from '../img/myWallet/wall2.png';
import wall3 from '../img/myWallet/wall3.png';
import wall4 from '../img/myWallet/wall4.png';
import wall5 from '../img/myWallet/wall5.png';
import wall6 from '../img/myWallet/wall6.png';
//gal
import gal1 from '../img/galatro/gal1.png';
import gal2 from '../img/galatro/gal2.png';
import gal3 from '../img/galatro/gal3.png';
import gal4 from '../img/galatro/gal4.png';
import galvid1 from '../img/galatro/gavid1.mp4';
import galvid2 from '../img/galatro/galvid2.mp4';
import galvid3 from '../img/galatro/galvid3.mp4';
//berg
import berg1 from '../img/berg/berg1.png';
import berg2 from '../img/berg/berg2.png';
import berg3 from '../img/berg/berg3.png';
import bergvid1 from '../img/berg/bergvid1.mp4';
import bergvid2 from '../img/berg/bergvid2.mp4';
import bergvid3 from '../img/berg/bergvid3.mp4';
//oliv
import oliv1 from '../img/olivicola/oliv1.png';
import oliv2 from '../img/olivicola/oliv2.png';
import oliv3 from '../img/olivicola/oliv3.png';
import oliv4 from '../img/olivicola/oliv4.png';
import olivvid1 from '../img/olivicola/olivvid1.mp4';
import olivvid2 from '../img/olivicola/olivvid2.mp4';
//primacom
import primvid1 from '../img/primacom/primvid1.mp4';
import primvid2 from '../img/primacom/primvid2.mp4';
import primvid3 from '../img/primacom/primvid3.mp4';
import primvid4 from '../img/primacom/primvid4.mp4';
import primvid5 from '../img/primacom/primvid5.mp4';
import primvid6 from '../img/primacom/primvid6.mp4';
//bilancio
import bilavid1 from '../img/bilancio/bilavid1.mp4';
import bilavid2 from '../img/bilancio/bilavid2.mp4';
import bilavid3 from '../img/bilancio/bilavid3.mp4';
import bila1 from '../img/bilancio/bila1.png';
import bila2 from '../img/bilancio/bila2.png';
import bila3 from '../img/bilancio/bila3.png';
//ecom
import ecomvid1 from '../img/ecom/ecomvid1.mp4';
import ecom1 from '../img/ecom/ecom1.png';
import ecom2 from '../img/ecom/ecom2.png';
import ecom3 from '../img/ecom/ecom3.png';
import ecom4 from '../img/ecom/ecom4.png';
import ecom5 from '../img/ecom/ecom5.png';
import ecom6 from '../img/ecom/ecom6.png';
//ghibli
import ghibvid1 from '../img/ghibli/ghibvid1.mp4';
import ghibvid2 from '../img/ghibli/ghibvid2.mp4';
import ghib1 from '../img/ghibli/ghib1.png';
import ghib2 from '../img/ghibli/ghib2.png';
import ghib3 from '../img/ghibli/ghib3.png';
import ghib4 from '../img/ghibli/ghib4.png';


export const progetti = [

  {
    id: 1,
    name: "Eucarebeef",
    whatis: "PHP portal",
    tecs: ["Back/Front-end Development", "Creative Website Architecture", "Wordpress", "blog"],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2024,
    href: "https://www.eucarebeef.eu/",
    preimg: eucare,
    primacom:true,
    imgs: [eucare1,eucare2,eucare3,eucare4,eucare5,eucare6,]
  },
  {
    id: 2,
    name: "My Smart Wallet",
    whatis: "Java Spring Project",
    tecs: ["Back-end Development", "Creative Website Architecture", "SpringBoot", "MVC pattern"],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2023,
    href: "https://github.com/Agarbala/mysmartwallet",
    preimg: myWallett,
    imgs: [wall1,dashboard,wall2,wall3,wall4,wall5,wall6,]
  },
  {
    id: 3,
    name: "Ghibli cards",
    whatis: "React Project", 
    tecs: ["React Vite", "Bootstrap", "GSAP animations", "React-router-dom", ],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2024,
    href: "https://deft-beignet-70039e.netlify.app/",
    preimg: ghib4,
    primacom: false,
    imgs: [ghibvid1, ghib1, ghib2,ghibvid2, ghib3]

  },
  {
    id: 4,
    name: "Primacom",
    whatis: "Website",
    tecs: ["Wordpress PHP", "Creative Website Architecture", "GSAP animations", "custom implementations", ],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2023,
    href: "https://www.primacom.cloud/",
    preimg: primacom,
    primacom: true,
    imgs: [primvid1,primvid2,primvid3,primvid4,primvid5,primvid6]

  },
  {
    id: 5,
    name: "Bergamotto RC",
    whatis: "Website",
    tecs: ["Wordpress PHP", "Creative Website Architecture", "GSAP animations", "custom implementations", ],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2023,
    href: "https://www.consorzioditutelabergamottorc.it/",
    preimg: bergamotto,
    primacom: true,
    imgs: [berg1,bergvid1, berg2,bergvid3, berg3, bergvid2]
  },
  {
    id: 6,
    name: "Terme di Galatro",
    whatis: "Website",
    tecs: ["Wordpress PHP", "Creative Website Architecture", "GSAP animations", "custom implementations", ],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2023,
    href: "https://www.letermedigalatro.it/",
    preimg: galatro,
    primacom: true,
    imgs: [galvid3,galvid1,gal2,gal1,gal3,galvid2,gal4]
  },
  {
    id: 7,
    name: "Bilancio",
    whatis: "PHP Project",
    tecs: ["PHP", "mySql database", "vanilla javascript"],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2022,
    href: "",
    preimg: bila1,
    imgs: [bila1,bilavid1,bilavid2,bilavid3,bila2,bila3]
  },
  {
    id: 8,
    name: "Olive oil from Eu",
    whatis: "website with Games",
    tecs: ["Wordpress", "Creative Website Architecture", "Recipe blog", "mini-game development", ],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2023,
    href: "https://www.oliveoilfromeurope.eu/",
    preimg: olivicola,
    primacom: true,
    imgs: [oliv2,oliv1,olivvid1,oliv3,olivvid2,oliv4]

  },
  {
    id: 9,
    name: "E-commerce",
    whatis: "Full stack Project",
    tecs: ["PHP", "Full stack project", "e-commerce", "shop manager"],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2020,
    href: "https://github.com/Agarbala/mysmartwallet",
    preimg: ecomm,
    imgs: [ecomvid1,ecom1,ecom2,ecom3,ecom4,ecom5,ecom6]

  }
]