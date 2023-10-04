
//Chat area

// Define un objeto que contiene información sobre distintas secciones del chat
var data = {
    chatinit: {
        title: ["Hola, yo soy el asistente virtual de CILSA.", "¿Cómo puedo ayudarte?"],
        options: ["Sobre CILSA", "Ubicación", "Opciones de curso virtual", "Cursos con LSA", "Talleres virtuales",]
    },

    sobre: {
        title: ["CILSA es una Organización No Gubernamental (O.N.G.) de bien público fundada el 14 de mayo de 1966 en la ciudad de Santa Fe, República Argentina."],
        options: ["Saber más"],
        url: {
            link: ["https://www.cilsa.org/mision/"],
        }
    },

    ubicación : {
        title: ["CILSA cuenta con presencia institucional en Santa Fe, Ciudad Autónoma de Buenos Aires, Córdoba, Rosario, La Plata, Mar del Plata. A través de convenios con otras ONG´S, llega a Tucumán, Cipolletti y Trelew."],
        options: ["Saber más"],
        url: {
            link: ["https://www.cilsa.org/mision/"],
        }
    },

    opciones: {
        title: ["Aquí tienes algunas opciones de curso virtual en CILSA: "],
        options: ["Java Script intensivo", "Introducción a la programación web", "Introducción a la base de datos", "Python", "Herramientas digitales", "Otras opciones"],
        url : {
            link: ["https://www.cilsa.org/pof/intensivo-de-javascript/", "https://www.cilsa.org/pof/237096/", "https://www.cilsa.org/pof/introduccion-a-las-bases-de-datos/", "https://www.cilsa.org/pof/python/", "https://www.cilsa.org/pof/herramientas-digitales-para-educadores/","https://www.cilsa.org/programa-de-oportunidades-economicas/pof-virtuales/"],
        }
    },

    cursos: {
        title: ["Aquí tienes algunas opciones de curso virtual con LSA en CILSA: "],
        options: ["Programación web", "Operador de PC"],
        url: {
            link: ["https://www.cilsa.org/pof/introduccion-a-la-programacion-web-con-lsa/", "https://www.cilsa.org/pof/operador-de-pc-con-lsa/"],
        }
    },

    talleres: {
        title: ["Aquí tienes algunas opciones de talleres virtuales en CILSA: "],
        options: ["Comercio electrónico", "Linkedin", "Orientación vocacional ocupacional", "Aprender a emprender", "Búsqueda digital de empleo"], 
        url: {
            link: ["https://www.cilsa.org/pof/comercio-electronico/", "https://www.cilsa.org/pof/linkedin/", "https://www.cilsa.org/pof/orientacion-vocacional-ocupacional/", "https://www.cilsa.org/pof/taller-aprender-a-emprender/", "https://www.cilsa.org/pof/taller-busqueda-digital-de-empleo/"],
        }
    }

}

// Evento escucha para el elemento con id "init" que activa el chat bot//
document.getElementById("init").addEventListener("click",showChatBot);
// Variable para almacenar el elemento de contenido
var cbot= document.getElementById("contenido");

// Longitud del array de títulos en la propiedad chatinit del objeto data
var len1= data.chatinit.title.length;

// Función para mostrar u ocultar el chat bot según el clic del botón
function showChatBot(){
    console.log(this.innerText);
    if(this.innerText=='INICIAR CHAT'){
        document.getElementById('test').style.display='block';
        document.getElementById('init').innerText='CERRAR CHAT';
        initChat();
    }
    else{
        location.reload();
    }
}

// Función para iniciar el chat mostrando mensajes con un retraso
function initChat(){
    j=0;
    cbot.innerHTML='';
    for(var i=0;i<len1;i++){
        setTimeout(handleChat,(i*500));
    }
    setTimeout(function(){
        showOptions(data.chatinit.options)
    },((len1+1)*500))
}


// Variable para llevar un seguimiento del índice en el array de títulos
var j=0;
// Función para manejar la visualización de mensajes con un retraso
function handleChat(){
    console.log(j);
    var elm= document.createElement("p");
    elm.innerHTML= data.chatinit.title[j];
    elm.setAttribute("class","msg");
    cbot.appendChild(elm);
    j++;
    handleScroll();
}

// Función para mostrar opciones en el chat
function showOptions(options){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<div>'+options[i]+'</div>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    }
}

// Función para manejar la selección de opción por parte del usuario
function handleOpt(){
    console.log(this);
    // Obtiene el texto del elemento clicado y extrae la primera palabra
    var str= this.innerText;
    var textArr= str.split(" ");
    var findText= textArr[0];
    
    // Elimina todas las opciones existentes
    document.querySelectorAll(".opt").forEach(el=>{
        el.remove();
    })

    // Crea un nuevo elemento con la opción seleccionada y lo agrega al contenido del chat
    var elm= document.createElement("p");
    elm.setAttribute("class","test");
    var sp= '<span class="rep">'+this.innerText+'</span>';
    elm.innerHTML= sp;
    cbot.appendChild(elm);

    // Convierte el texto a minúsculas y utiliza eso como clave para obtener un objeto tempObj de los datos
    console.log(findText.toLowerCase());
    var tempObj= data[findText.toLowerCase()];
    // Llama a la función para manejar los resultados con los datos correspondientes
    handleResults(tempObj.title,tempObj.options,tempObj.url);
}

// Función para manejar el retraso en los mensajes del chat
function handleDelay(title){
    var elm= document.createElement("p");
        elm.innerHTML= title;
        elm.setAttribute("class","msg");
        cbot.appendChild(elm);
}

// Función para manejar la visualización de resultados en el chat
function handleResults(title,options,url){
    for(let i=0;i<title.length;i++){
        setTimeout(function(){
            handleDelay(title[i]);
        },i*500)
        
    }

    // Función para verificar si el objeto URL está vacío
    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    // Verificar si el objeto URL está vacío y mostrar más opciones o resultado final según corresponda
    if(isObjectEmpty(url)==true){
        console.log("having more options");
        setTimeout(function(){
            showOptions(options);
        },title.length*500)
        
    }
    else{
        console.log("end result");
        setTimeout(function(){
            handleOptions(options,url);
        },title.length*500)
        
    }
}

// Función para manejar la visualización de opciones con enlaces externos
function handleOptions(options,url){
    for(var i=0;i<options.length;i++){
        var opt= document.createElement("span");
        var inp= '<a class="m-link" href="'+url.link[i]+'" target="_blank">'+options[i]+'</a>';
        opt.innerHTML=inp;
        opt.setAttribute("class","opt");
        cbot.appendChild(opt);
    }

    // Función para verificar si el objeto URL está vacío
    const isObjectEmpty= (url)=>{
        return JSON.stringify(url)=== "{}";
    }

    // Imprime en consola si el objeto URL está vacío
    console.log(isObjectEmpty(url));
    console.log(url);

    // Configura el contenido y clase del elemento opt, lo agrega al contenido del chat y realiza un ajuste del desplazamiento
    opt.innerHTML=inp;
    opt.setAttribute("class","opt");
    cbot.appendChild(opt);
    handleScroll();
}

// Función para desplazarse hasta la parte inferior del contenido del chat
function handleScroll(){
    var elem= document.getElementById('contenido');
    elem.scrollTop= elem.scrollHeight;
}

// Función para actualizar el chat
function refresh() {
    initChat();
}