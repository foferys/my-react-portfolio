
import myWallett from '../img/mysmartwallet.jpg';
import olivicola from '../img/olivicola.png';
import bergamotto from '../img/bergamotto.png';
import galatro from '../img/galatro.jpg';
import primacom from '../img/primacom.png';
import bilanciophp from '../img/bilanciophp.jpg';
import ecomm from '../img/ecommerce.jpg';
//msw
import account from '../img/myWallet/account.png';
import pattern from '../img/myWallet/pattern.png';
import dashboard from '../img/myWallet/dashboard.png';
import login from '../img/myWallet/login.png';
import sidebar from '../img/myWallet/sidebar.png';
import tendina from '../img/myWallet/tendina.png';
import obiettivo from '../img/myWallet/obiettivo.png';
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


export const progetti = [

  {
    id: 1,
    name: "My Smart Wallet",
    whatis: "Java Spring Project",
    tecs: ["Back-end Development", "Creative Website Architecture", "SpringBoot", "MVC pattern"],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2023,
    href: "https://github.com/Agarbala/mysmartwallet",
    preimg: myWallett,
    imgs: [account, pattern, dashboard, login, sidebar, tendina, obiettivo]
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
    name: "Terme di Galatro",
    whatis: "Website",
    tecs: ["Wordpress PHP", "Creative Website Architecture", "GSAP animations", "custom implementations", ],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2023,
    href: "https://www.letermedigalatro.it/",
    preimg: galatro,
    primacom: true,
    imgs: [gal1,galvid1,gal2,gal3,galvid2,gal4,galvid3]
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
    name: "E-commerce",
    whatis: "Full stack Project",
    tecs: [],
    desc: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates sequi nulla neque doloremque modi totam.",
    date: 2022,
    href: "https://github.com/Agarbala/mysmartwallet",
    preimg: ecomm,
    imgs: ["src/img/myWallet/account.png", "src/img/myWallet/account.png", "src/img/myWallet/account.png", "src/img/myWallet/account.png", "src/img/myWallet/account.png", "src/img/myWallet/account.png", "src/img/myWallet/account.png"]

  }
]