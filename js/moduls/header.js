// headerData.js

const headerData = {
    // Topbar con enlaces de contacto y plataformas externas
    topbar: [
        {
            icono: 'fa fa-envelope mr-2',
            enlace: 'mailto:matriculas@superarse.edu.ec',
            texto: 'matriculas@superarse.edu.ec',
            clases: 'd-none d-lg-block mr-3 text-white'
        },
        {
            icono: 'fa fa-phone-alt mr-2',
            enlace: 'tel:023930980',
            texto: '(02) 393 0980',
            clases: 'd-none d-lg-block mr-3 text-white'
        },
        {
           
            enlace: '/moduls/noticiasContactos/contactanos.html',
            texto: 'Superarse Conectados |',
            clases :"navbar-brand",
            target: '_blank'
        },
        {
        
            enlace: 'https://becasuperarse.ec/',
            texto: 'Because he´s Nice |',
            clases :"navbar-brand",
            target: '_blank'
        },
        {
            enlace: 'https://superarse.q10.com',
            texto: 'Q10',
            clases: 'navbar-brand',
            target: '_blank'
        },
        {
            enlace: 'https://teams.microsoft.com/v2/',
            texto: 'Teams',
            clases: 'navbar-brand',
            target: '_blank'
        },
        {
            texto: 'Calendarios',
            clases: 'nav-link dropdown-toggle text-white',
            items: [
                { enlace: '/assets/calendarios/*', texto: 'Calendario Académico' },
                { enlace: '/assets/calendarios/*', texto: 'Calendario de Titulación' },
                { enlace: '/assets/calendarios/*', texto: 'Calendario de Investigación' },
                { enlace: '/assets/calendarios/*', texto: 'Calendario de Vinculación' },
                { enlace: '/assets/calendarios/*', texto: 'Calendario de Prácticas Preprofesionales' }
            ]
            
        }
        
    ],
    
    
    // Barra de navegación principal con los menús institucionales
    mainNav: [
        {
            texto: '¿Quienes Somos?',
            items: [
               { enlace: '/moduls/institucion/misionVison.html', texto: 'Misión y Visión' },
               { enlace: '/moduls/institucion/mensajeRectora.html', texto: 'Mensaje de la Rectora' },
               { enlace: '/moduls/institucion/modeloPedagogico.html', texto: 'Modelo Pedagógico' },
               
                
                
                { enlace: '/moduls/institucion/calidadPlanificacion.html', texto: 'Calidad' },
                 { enlace: '/moduls/institucion/calidadPlanificacion.html', texto: 'Calidad y Planificación' },
                { enlace: '/moduls/institucion/codigoinstitucional.html', texto: 'Código institucional' },
                { enlace: '/moduls/institucion/modelos.html', texto: 'Modelos' },
                {
                    texto: 'Estructura',
                    id: 'dropdownMarcoLegal',
                    items: [
                { enlace: '/moduls/institucion/organigrama.html', texto: 'Organigrama' },
                { enlace: '/moduls/institucion/autoridades.html', texto: 'Autoridades' },
                { enlace: '/moduls/institucion/estatuto.html', texto: 'Estatuto' },
                    ]
                },
                {
                    texto: 'Marco Legal',
                    id: 'dropdownMarcoLegal',
                    items: [
                        { enlace: '/moduls/institucion/reglamentos.html', texto: 'Reglamentos' },
                        { enlace: '/moduls/institucion/normativa.html', texto: 'Normativa' },
                        { enlace: '/moduls/institucion/protocolos.html', texto: 'Protocolos' }
                    ]
                },
                {
                    texto: 'Transparencia',
                    id: 'dropdownMarcoLegal',
                    items: [
                { enlace: '/moduls/Servicios/estadoFinanciero.html', texto: 'Estado Financiero' },
                { enlace: '/moduls/Servicios/rendicionCuentas.html', texto: 'Rendición de Cuentas' },
                { enlace: '/moduls/Servicios/remuneracionMensual.html', texto: 'Remuneración Mensual' },
                { enlace: '/moduls/Servicios/aranceles.html', texto: 'Aranceles' },
                { enlace: '/moduls/Servicios/balanceGeneral.html', texto: 'Balance General' },
                { enlace: '/moduls/Servicios/cumplimientoTributario.html', texto: 'Cumplimiento Tributario' },
                { enlace: '/moduls/Servicios/planificacionPedi.html', texto: 'Planificación PEDI' },
                { enlace: '/moduls/Servicios/balancesAuditados.html', texto: 'Balances Auditados' }
                    ]
                }
            ]
        },
        {
            texto: 'Oferta Académica',
            items: [
                { enlace: '/moduls/gestionAcademica/escuelaSalud.html', texto: 'Escuela de Salud' },
                { enlace: '/moduls/gestionAcademica/escuelaEducacionHumanidades.html', texto: 'Escuela de Educación y Humanidades' },
                { enlace: '/moduls/gestionAcademica/escuelaVeterinaria.html', texto: 'Escuela de Veterinaria' },
                { enlace: '/moduls/gestionAcademica/escuelaAdministracionIndustria.html', texto: 'Escuela de Administración e Industria' },
                { enlace: '/moduls/gestionAcademica/escuelaConstruccionExtraccion.html', texto: 'Escuela de Construcción y Extracción' }
            ]
        },
        {
            texto: 'Servicios',
            items: [
                { enlace: 'https://biblioteca.superarse.edu.ec', texto: 'Biblioteca Dra. Mery Navas', target: '_blank' },
               { enlace: '/moduls/subMenu/BienestarInstitucional/BienestarInstitucional.html', texto: 'Bienestar Institucional ' },
               { enlace: 'https://biblioteca.superarse.edu.ec', texto: 'Infraestructura', target: '_blank' },
                
            ]
        },
        {
            texto: 'Admisiones',
            items: [
                { enlace: '/moduls/Admisiones/porQueElegirnos.html', texto: '¿Por qué Elegirnos?' },
                { enlace: '/moduls/Admisiones/procesoAdmision.html', texto: 'Proceso de Admisión' }
            
            ]
        },
        {
            texto: 'Vinculación con la sociedad ',
            //enlace: '/moduls/subMenu/vinculacionSociedad/vinculacionSociedad.html'
            items: [
                { enlace: '/moduls/Admisiones/porQueElegirnos.html', texto: 'Programas y proyectos de vinculación con la sociedad' },
                { enlace: '/moduls/Admisiones/procesoAdmision.html', texto: 'Practicas Pre-Profesionales' },
                { enlace: '/moduls/Admisiones/procesoAdmision.html', texto: 'Relaciones InterInstitucionales' },
                { enlace: '/moduls/Admisiones/procesoAdmision.html', texto: 'Presencia en la comunidad' }
            
            ]
        }, 
        {
            texto: 'Investigación',
            enlace: '/moduls/subMenu/investigacion/investigacion.html'
            
        },
        {
            texto: 'Noticias ',
            items: [
                { enlace: '#', texto: 'Congreso Topografía' },
                { enlace: '#', texto: 'Seminario Equino' },
                { enlace: '#', texto: 'Simposio Administración' },
            ]
        }
    ],
    // Enlace final de "Plataformas"
    finalLink: {
        enlace: '/moduls/Plataformas/plataformas.html',
        texto: 'Plataformas',
        clases: 'btn btn-primary px-4',
        target: '_blank'
    }
};