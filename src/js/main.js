


/* ----musica---- */

//   var sound = new Howl({
//     src: ['leap-motiv-113893.mp3']
//   });
//   const linesCont = document.querySelector(".music-lines2")
//   const lines = document.querySelectorAll(".line2")

//   let playing = false;
//   linesCont.addEventListener("click", function() {
//     if (playing) {
//         lines.forEach(line => line.classList.remove("animate2"));
//         sound.pause();
//         playing = false;
//     } else {
//         lines.forEach(line => line.classList.add("animate2"));
//         sound.play();
//         playing = true;
//     }
// });


//   document.addEventListener("DOMContentLoaded", function() {
//     var container = document.querySelector(".body");
//     var line = document.querySelector(".line2");
//     var containerBackgroundColor = window.getComputedStyle(container).getPropertyValue("background-color");
  
//     if (isDarkColor(containerBackgroundColor)) {
//       line.style.backgroundColor = "#fff"; // Cambia il colore delle linee in bianco sui fondi scuri
//     }
//   });
  
//   function isDarkColor(color) {
//     // Calcola il valore di luminosità del colore utilizzando la formula WCAG
//     // https://www.w3.org/TR/AERT/#color-contrast
//     var rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
//     var brightness = (rgb[1] * 299 + rgb[2] * 587 + rgb[3] * 114) / 1000;
//     return brightness < 128;
//   }

/* ----musica---- */

/* ---CURSOR SWITCH---------- */

    // let cursorCont = document.querySelector("#noCursor");
    // const cursorSwitch = document.querySelector("#cursorSwitch")
    // const cursorText = document.querySelector(".cursorText")

    // function attivaDisattiva() {
    // if (cursorCont) {
    //     // Ottieni il valore corrente di justifyContent tramite getComputedStyle
    //     let computedStyle = window.getComputedStyle(cursorCont);
    //     let cursorFlex = computedStyle.getPropertyValue("justify-content");

    //     console.log("Valore corrente di justifyContent:", cursorFlex);

    //     // Ora puoi impostare il nuovo valore
    //     if(cursorFlex == "flex-start") {
    //     cursorCont.style.justifyContent = "flex-end";
    //     document.body.style.cursor="default";
    //     cursor.classList.add("hidden")
    //     outline.classList.add("hidden")
    //     cursorText.innerHTML="<i class='uil uil-circle-layer'></i>"
    //     cursorSwitch.style.backgroundColor="green"
    //     }
    //     else {
    //     cursorCont.style.justifyContent = "flex-start";
    //     document.body.style.cursor="none";
    //     cursor.classList.remove("hidden")
    //     outline.classList.remove("hidden")
    //     cursorText.innerHTML="<i class='uil uil-mouse-alt'></i>"
    //     cursorSwitch.style.backgroundColor="red"

    //     }

    // } else {
    //     console.error("Elemento con id 'cursorCont' non trovato.");
    // }
    
    // }

    // if(cursorSwitch) {  //verifica perché abbiamo due pagine diverse, con php non necessario
    // cursorSwitch.addEventListener("click", function() {
    //     attivaDisattiva() 
    // })
    // }

    /* gsap.from("#noCursor", {
    opacity:0,
    y:"-20px",
    delay: "5s"
    }) */

/* ---CURSOR SWITCH---------- */


//----funzione per far apparire l'header in basso allo scroll----------------------

function cambioDimensioneHeaderOnscroll() {
  // ottieni l'elemento div
  var headerBox2 = document.querySelector(".header2--visible");
  var goBack = document.querySelector(".goBack--visible");

  // ottieni la posizione verticale dell'elemento sulla pagina
  var y = headerBox2.getBoundingClientRect().top;
  var y2 = goBack.getBoundingClientRect().top;

  // ottieni lo scroll della pagina
  var scroll = window.pageYOffset;

  // confronta la posizione dell'elemento con lo scroll della pagina
  //** nota che essendo il secondo header in basso, bisogna prendere in considerazione
  // uno scroll  di 1000
  if ( y + scroll < 1200) {
      headerBox2.style.bottom = "-57px";

  } else {
      headerBox2.style.bottom = "37px";

  }
  //scomparsa freccia goBack
  if (y2 +scroll < 2700) {
      
      goBack.style.bottom = "-57px";

  } else {
      goBack.style.bottom = "37px";

  }
}


// esegui la funzione allo scroll della pagina
window.onscroll = function() {
  cambioDimensioneHeaderOnscroll();
};

// -- header  basso end---------------------------------------------



//mouse che indica di andare giu con animazione
window.addEventListener("scroll", function() {
    hidden();
})
function hidden() {
  
  if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
    document.querySelector(".scroll_down").classList.add("hidden")
  } else {
    document.querySelector(".scroll_down").classList.remove("hidden")

  }

}

// mouse scroll end----------





// let item = document.querySelector('.icon-hamburger');
// item.addEventListener("click", function() {
//   document.body.classList.toggle('menu--open');
// });



//--OBSERVER ANIMAZIONE ALLO SCROLL ---------

// ----PRENdIAMO LA CLASSE
var elements_to_watch = document.querySelectorAll('.watch');
// ----- AGGIUNGO UNA CLASSE IN-PAGE A TUTTI GLI ELEMENTI CHE HANNO CLASSE WHATCH
var callback = function(items){

  items.forEach((item) => {
    if(item.isIntersecting){
      item.target.classList.add("in-page");
    } else{
      item.target.classList.remove("in-page");
    }
  });
  
}

// observer - CONTROLLA TUTTI GLI ELEMENTI NELLA FUNZIONE CALLBACK ^ 
//E SE STANNO ENTRANDO NELLA PAG GLI AGGIUNGE LA CLASSE "in-page" attraverso la funzione in
//alto callback, e se non sono nella pagina rimuove la classe "in-page"
var observer = new IntersectionObserver(callback, { threshold: 0.6 } ); //threshold è quando è nel nostro schernmo

// applico l'observer con un foreach a tutti gli elementi watch
elements_to_watch.forEach((element) => {
  observer.observe(element); 
});

//----fine OBSERVER ------------------------------

//--OBSERVER ANIMAZIONE ALLO SCROLL senza ritorno ---------

// ----PRENdIAMO LA CLASSE
var elements_to_watch = document.querySelectorAll('.watch2');
// ----- AGGIUNGO UNA CLASSE IN-PAGE A TUTTI GLI ELEMENTI CHE HANNO CLASSE WHATCH
var callback2 = function(items){
  items.forEach((item) => {

    if(item.isIntersecting){
      item.target.classList.add("in-page2");
    }

  });
}

// observer - CONTROLLA TUTTI GLI ELEMENTI NELLA FUNZIONE CALLBACK ^ 
//E SE STANNO ENTRANDO NELLA PAG GLI AGGIUNGE LA CLASSE "in-page" attraverso la funzione in
//alto callback, e se non sono nella pagina rimuove la classe "in-page"
var observer = new IntersectionObserver(callback2, { threshold: 0.6 } ); //threshold è quando è nel nostro schernmo

// applico l'observer con un foreach a tutti gli elementi watch
elements_to_watch.forEach((element) => {
  observer.observe(element); 
});

//----fine OBSERVER senza ritorno ------------------------------


//-- sezione websites
const text = document.querySelectorAll(".servizi");
const image = document.querySelectorAll(".img");

for(let i=0; i<text.length; i++) {

text[i].addEventListener("mousemove", function(event) {
  image[i].style.left = `${event.clientX}px`;
  image[i].style.top = event.clientY + "px";
});
}

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
console.log("mobile");
} else {
console.log("not mobile");

}


//-----CARICAMENTO PRE LOADING  PAGINA----
//   var loading = document.querySelector(".loader");
//   var back = document.querySelector(".preload");

//   window.addEventListener("load", function () {

//     if (document.readyState === "complete") {
//       // Il caricamento è completo, puoi eseguire le operazioni qui
//       console.log("Il caricamento è completo.");
//       loading.style.display="none";
//       back.style.display="none";
//     } else {
//       // Il documento non è completamente caricato, potresti voler attendere
//       // o gestire la situazione in un altro modo, a seconda delle tue esigenze.
//       console.log("Il documento non è completamente caricato.");
//       loading.style.display="inherit";
//       back.style.display="inherit";
//     }

//     //  caricamento con timer per farlo vedere lo stesso
//     let tID = setTimeout(function() {
    
//       loading.style.display="none";
//       back.style.display="none";
//     },1000) 

//   });
//-----FINE CARICAMENTO PRE LOADING  PAGINA----


/* animazione scroll 3D */
    // const canvas = document.querySelector(".canvas");
    // if(canvas) {

    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    // }

    // const context = canvas.getContext("2d");
    // const frameCount = 170;

    // const currentFrame = (index) => {
    // //return `./quadroani/${(index + 1).toString()}.jpg`;
    // return `./quadroani2/${(index + 1).toString()}-min.jpg`;
    // }

    // const images = [];

    // let frameCorrente = {
    // frame: 0
    // }

    // for(let i=0; i<frameCount; i++) {
    // const img = new Image();
    // img.src = currentFrame(i);
    // images.push(img);
    // }


    // gsap.to(frameCorrente, {
    // frame: frameCount -1,
    // snap: "frame",
    // ease: "none",

    // scrollTrigger: {
    // //markers: true,
    // scrub: 0.5,
    // pin: "canvas",
    // end: "300%"
    // },

    // scrollTrigger: {
    // scrub: 0.5,
    // //markers: true,
    // pin: "#canvasbox",
    // end: "300%",

    // },

    // onUpdate: render
    // }) ;



/* animazione testo su 3d */

    // const tl = gsap.timeline({defaults:{opacity:0}});

    // tl.from(".trigText", {
    // y: "-20px",

    // scrollTrigger: {
    // trigger: ".trigText",
    // /* markers: true, */
    // start: "5400%",
    // end: "5800%",
    // scrub: true,
    // },

    // })
    // .from(".trigText2", {
    // y: "-20px",

    // scrollTrigger: {
    // trigger: ".trigText",
    // /* markers: true, */
    // start: "5600%",
    // end: "5900%",
    // scrub: true,
    // },

    // })
    // .from(".copy", {
    // x: "-40px",

    // scrollTrigger: {
    // trigger: ".trigText2",
    // //markers: true, 
    // start: "2200%",
    // end: "3000%",
    // scrub: true,
    // },

    // })


//-----animazione linea con pallino su 3d--

    // const timeline = gsap.timeline({
    // paused: true,
    // })

    // timeline.to(".line", {
    // width: "400px",
    // opacity: 1,
    // delay: .1,
    // duration: 0.5,

    // })

    // gsap.to(".line", {
    // scrollTrigger: {
    //     trigger: ".trigText", //prendo come riferimento il testo sopra altrimenti riferito alla linea .line sarebbe troppo in ritardo
    //     //markers: true,
    //     start: "5900%",
    //     scrub: true,
    //     onEnter: () => {
    //     timeline.play()
    //     },
    //     onLeaveBack: () =>  {
    //     timeline.reverse();
    //     }
    // }
    // })

//-----fine animazione linea----------------


// images[0].onload = render;

// function render() {

//   context.canvas.width = images[0].width;
//   context.canvas.height = images[0].height;

//   context.clearRect(0,0, canvas.width, canvas.height);
//   context.drawImage(images[frameCorrente.frame], 0, 0);

// }



