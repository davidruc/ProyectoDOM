export default{
    contenido: {
        titulo: "El mejor café origánico",
        paragraph:  `El café Guaure está cultivado de manera sostenible, sin químicos tóxicos, haciendolo una opción saludable para ti y para el planeta. Además, su sabor auténtico y su alta calidad te garantizarán una experiencia única para el paladar.   <strong>  <em>  Atrévete a probarlo.`,
        btn: {
            name : "saber más...",
            href: "https://juanvaldez.com/"
        }
    },

    image: "./img/cafe.jpg",
    imagen2: "./img/logo.png",
    

    show2(){
        const ws2 = new Worker("storage/wsMyBanner.js", {type:"module"});
        let id2 = [];
        let count2 = 0;

        ws2.postMessage({module: "showImage", data: this.image});
        id2.push("#banner");
        ws2.postMessage({module: "showSectionBanner", data: this.contenido});
        id2.push("#logo");
        ws2.postMessage({module: "showLogo", data: this.imagen2});
        ws2.addEventListener("message", (e)=>{
            let doc2 = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelectorAll("#logo").append(...doc2.body.children);
            ws2.terminate();
        });
        ws2.addEventListener("message", (e)=>{
            let doc3 = new DOMParser().parseFromString(e.data, "text/html");
            document.querySelector("#banner").append(...doc3.body.children);
            (id2.length-1==count2) ? ws2.terminate() : count2++;
        })
    }
}