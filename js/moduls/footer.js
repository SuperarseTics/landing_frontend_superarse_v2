// footerData.js

const footerData = {
    // Enlace flotante de WhatsApp
    whatsapp: {
        enlace: "https://wa.me/593995901732?text=Hola%2C%20necesito%20información%20sobre%20sus%20carreras.",
        imagenSrc: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
        alt: "WhatsApp"
    },
    // Contenido de la primera columna
    info: {
        logo: "/assets/img/content/logo/superarse_gris.png",
        descripcion: "#",
        redes: [
            { enlace: "https://twitter.com/superarse1", icono: "fab fa-twitter" },
            { enlace: "https://www.facebook.com/superarse1/", icono: "fab fa-facebook-f" },
            { enlace: "https://ec.linkedin.com/company/superarse1", icono: "fab fa-linkedin-in" },
            { enlace: "https://www.instagram.com/superarse1?igsh=MWJmNmNlNW5qZThtZA==", icono: "fab fa-instagram" }
        ]
    },
    // Contenido de la segunda columna (Contacto)
    contacto: {
        titulo: "Póngase en contacto",
        elementos: [
            { icono: "fa fa-map-marker-alt", titulo: "Dirección", texto: "Av. General Rumiñahui e Isla Pinta 1111, Sangolqui" },
            { icono: "fa fa-envelope", titulo: "Email", texto: "matriculas@superarse.edu.ec" },
            { icono: "fa fa-phone-alt", titulo: "Teléfono", texto: "(02) 393-0980" }
        ]
    },
    // Contenido de la tercera columna (Enlaces rápidos)
    enlacesRapidos: {
        titulo: "Enlaces rápidos",
        items: [
            { texto: "Noticias", enlace: "#" },
            { texto: "Biblioteca", enlace: "#" },
            { texto: "Calendarios", enlace: "#" },
            { texto: "Plataformas", enlace: "/moduls/Plataformas/plataformas.html" }
            
        ]
    },
    // Contenido de la cuarta columna (Admisiones)
    admisiones: {
        titulo: "Admisiones",
        formulario: {
            placeholderNombre: "Nombres Completos.",
            placeholderEmail: "Correo Electronico.",
            placeholderDescription:"Describe tu Requerimiento y dejanos tu contacto .",
            textoBoton: "ENVIAR"
        }
    },
    // Texto del pie de página
    copyright: {
        texto: "&copy; <a class='text-primary font-weight-bold' href='#'>Superarse.edu.ec</a>. All Rights Reserved. Designed by <a class='text-primary font-weight-bold' href='https://superarse.edu.ec/'>Instituto Superarse</a>"
    }
};