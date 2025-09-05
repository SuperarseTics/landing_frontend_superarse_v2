// /js/moduls/BienestarEstudiantil/bienestarEstudiantil.js

// Configuración del PDF.js Worker para el visor de PDF
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
const pdfStates = {};

// Función para renderizar una página del PDF
async function renderPage(canvasId, pageNum) {
    const state = pdfStates[canvasId];
    if (!state || pageNum < 1 || pageNum > state.pdfDoc.numPages) return;

    state.pageNum = pageNum;
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const page = await state.pdfDoc.getPage(pageNum);
    const containerWidth = canvas.parentElement.clientWidth || canvas.clientWidth;
    const viewport = page.getViewport({ scale: 1 });
    const scale = containerWidth / viewport.width;
    const scaledViewport = page.getViewport({ scale });

    canvas.width = scaledViewport.width;
    canvas.height = scaledViewport.height;

    await page.render({ canvasContext: ctx, viewport: scaledViewport }).promise;

    const paginator = document.querySelector(`.pdf-paginator[data-canvas-id="${canvasId}"]`);
    if (paginator) {
        paginator.querySelector('.page-num').textContent = state.pageNum;
        paginator.querySelector('.page-count').textContent = state.pdfDoc.numPages;
        paginator.querySelector('[data-action="prev"]').disabled = state.pageNum <= 1;
        paginator.querySelector('[data-action="next"]').disabled = state.pageNum >= state.pdfDoc.numPages;
    }
}

// Función para cargar un PDF completo
async function loadPdfAndRender(pdfUrl, canvasId) {
    const pdfDoc = await pdfjsLib.getDocument(pdfUrl).promise;
    pdfStates[canvasId] = { pdfDoc, pageNum: 1 };
    renderPage(canvasId, 1);
}

// Lógica principal al cargar el documento
document.addEventListener("DOMContentLoaded", function () {
    // Objeto de datos con los títulos y el contenido HTML
    const bienestarData = {
        "Acompañamiento Psicosocial": ``,
        "Acompañamiento Psicopedagógico": `<h3 class="text-uppercase text-primary mb-3">Acompañamiento Psicopedagógico</h3>
            <p>Para lograr la inclusión en la educación se necesita de un proceso de acompañamiento psicopedagógico para estudiantes con Necesidades Especiales Educativa (NEE) realizado por la Coordinación de Bienestar Institucional. Para ello se sigue el siguiente proceso:</p>
            <ul>
                <li>Entrevista inicial</li>
                <li>Segunda entrevista</li>
                <li>Recomendaciones de ajustes razonables o adaptaciones curriculares</li>
                <li>Acompañamiento durante el periodo académico</li>
                <li>Entrevista final para evaluar el impacto del seguimiento</li>
            </ul>
            <p>Este servicio de Bienestar Institucional, se encuentra pensado para:</p>
            <ul>
                <li>Personas con discapacidad.</li>
                <li>Estudiantes con dificultades psicológicas o motrices.</li>
                <li>Estudiantes con dificultades de aprendizaje.</li>
                <li>Estudiantes que en su educación secundaria hayan recibido adaptaciones curriculares o terapias psicopedagógicas.</li>
            </ul>
            <p>La modalidad de las sesiones de acompañamiento pueden ser virtuales o presenciales, dependiendo la realidad socioeconómica del estudiante.</p>
            <img class="img-fluid rounded mb-4" src="/assets/img/bienestarEstudiantil/servicios/acompañamiento.png" alt="Imagen apoyo Acompañamiento Psicopedagógico" />
            <div class="text-center my-4">
                <p><b>¡No dudes en contactarnos!</b></p>
                <p>
                    <b>Correos electrónicos:</b> asistencia.bienestar@superarse.edu.ec; becas@superarse.edu.ec; coordinacion.bienestar@superarse.edu.ec.<br>
                    <b>Teléfono:</b> 02-3 930 980 ext. 111<br>
                    <b>WhatsApp:</b> 099 840 9293
                </p>
            </div>`,
        "Trabajo Social": `<h3 class="text-uppercase text-primary mb-3">Trabajo Social</h3>
            <p>Nuestro apartado de trabajo social está encargado de asegurar una convivencia adecuada de todos los miembros de la comunidad educativa, con la intención de lograr un desarrollo académico de los estudiantes que conecte con sus proyectos de vida, de esta forma, las actividades especiales son:</p>
            <ul>
                <li><b>Aplicación de Primera Atención Psicológica o Primeros Auxilios Psicológicos (PAP):</b> Responder a situaciones de emergencia, violencia o abuso, proporcionando las herramientas adecuadas para las personas afectadas.</li>
                <li><b>Desarrollo de programas para el bienestar general:</b> Crear e implementar programas para promover la salud mental, la convivencia sana, la equidad, inclusión y respeto por valores étnico-culturales.</li>
                <li><b>Acompañamiento y orientación:</b> Proporcionar apoyo emocional a estudiantes que enfrentan dificultades personales, académicas, culturales, políticas o financieras.</li>
            </ul>
            <img class="img-fluid rounded mb-4" src="/assets/img/bienestarEstudiantil/servicios/acompañamiento.png" alt="Imagen apoyo Trabajo Social" />
            <div class="text-center my-4">
                <p><b>¡No dudes en contactarnos!</b></p>
                <p>
                    <b>Correos electrónicos:</b> asistencia.bienestar@superarse.edu.ec; becas@superarse.edu.ec; coordinacion.bienestar@superarse.edu.ec.<br>
                    <b>Teléfono:</b> 02-3 930 980 ext. 111<br>
                    <b>WhatsApp:</b> 099 840 9293
                </p>
            </div>`,
        "Graduados": `<h3 class="text-uppercase text-primary mb-3">Graduados</h3>
            <p>El selecto grupo de graduados posee una conexión esencial con la institución en la que desarrollaron su vida profesional. Un profesional formado en el Instituto Superior Tecnológico Superarse es alguien preparado para incorporarse al mercado laboral de manera eficiente y adecuada. La Coordinación de Bienestar Institucional está encargada de acompañar a nuestros graduados con el fin de conocer su actividad después de haber cursado satisfactoriamente una carrera en la educación superior.</p>
            <p>Para el acompañamiento a graduados, tenemos:</p>
            <img class="img-fluid rounded mb-4" src="/assets/img/bienestarEstudiantil/servicios/facebook_1740537346470_7300342754448855695.jpg" alt="Imagen apoyo Graduados" />
            <div class="d-flex flex-wrap justify-content-center" style="gap: 0.5rem;">
                <a href="https://chat.whatsapp.com/IBpVozk9DoSLaviy1kRb3Z" class="btn btn-primary px-3 py-2 text-center"  target="_blank" style="white-space: nowrap;">Bolsa de Empleo - Comunidad de Whatsapp</a>
                <a href="https://www.facebook.com/groups/graduadosuperarse/" class="btn btn-primary px-3 py-2 text-center" target="_blank" style="white-space: nowrap;">Bolsa de Empleo - Grupo de Facebook</a>
                <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=Q55kP6NREkOuuxxVvxRacM1iUyNvm6NAt-AsANiElZxURFJDREdYRTREMkFGU0VITlBGSDkxUlQxRC4u" class="btn btn-primary px-3 py-2 text-center" target="_blank" style="white-space: nowrap;">Formulario Alumni para recién graduados</a>
                <a href="https://forms.office.com/pages/responsepage.aspx?id=Q55kP6NREkOuuxxVvxRacOeRdYpTl6NFhvgoxN1LIAZUMzlRSEowT1haNTBRM1kxTUNEQTE0M0E1VC4u&origin=lprLink&route=shorturl" class="btn btn-primary px-3 py-2 text-center" target="_blank"  style="white-space: nowrap;">Registro para empresas</a>
            </div>
            <div class="text-center my-4">
                <p><b>¡No dudes en contactarnos!</b></p>
                <p>
                    <b>Correos electrónicos:</b> asistencia.bienestar@superarse.edu.ec; becas@superarse.edu.ec; coordinacion.bienestar@superarse.edu.ec.<br>
                    <b>Teléfono:</b> 02-3 930 980 ext. 111<br>
                    <b>WhatsApp:</b> 099 840 9293
                </p>
            </div>`,
        "Clubes": `<h3 class="text-uppercase text-primary mb-3">Clubes</h3>
            <p>Dentro del Instituto Superior Tecnológico Superarse contamos con clubes que se orientan a ser espacios de convivencia armónica, actividades extracurriculares donde los estudiantes pueden desarrollar sus gustos y aficiones. Además, mientras aprenden las técnicas de cada uno de los clubes, fortalecen la confianza, autoestima y habilidades blandas para un manejo adecuado de la comunicación en las relaciones sociales que mantengan. Estos clubes se desarrollan dentro de un periodo académico ordinario, aperturándose al inicio del mismo y renovándose para el siguiente.</p>
            <h5 class="mt-4">¡Contamos con los siguientes clubes!</h5>
            <div class="mb-5">
                <h6>Club de Danza</h6>
                <p>El club de danza reúne a miembros de la comunidad educativa sin discriminación alguna, practicando diversos tipos de danzas que se conectan con los principios y valores histórico-culturales de múltiples sociedades. Sus sesiones son de carácter presencial, asegurando su participación en eventos en representación del Instituto Superior Tecnológico Superarse.</p>
                <div id="carruselDanza" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-inner">
                        <div class="carousel-item active"><img src="/assets/img/bienestarEstudiantil/servicios/danza/1.png" class="d-block w-100" alt="Danza 1"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/danza/2.png" class="d-block w-100" alt="Danza 2"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/danza/3.png" class="d-block w-100" alt="Danza 3"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/danza/4.png" class="d-block w-100" alt="Danza 4"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/danza/5.png" class="d-block w-100" alt="Danza "></div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carruselDanza" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carruselDanza" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="mb-5">
                <h6>Club de Equitación</h6>
                <p>El club de equitación es parte del Programa de Psicología Positiva, dado que la conexión equino-humano proporciona herramientas necesarias para el correcto manejo del estrés, ansiedad, depresión o situaciones que puedan comprometer la salud mental de los estudiantes.</p>
                <div id="carruselEquitacion" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-inner">
                        <div class="carousel-item active"><img src="/assets/img/bienestarEstudiantil/servicios/equitacion/1.png" class="d-block w-100" alt="Equitación 1"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/equitacion/2.png" class="d-block w-100" alt="Equitación 2"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/equitacion/3.png" class="d-block w-100" alt="Equitación 3"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/equitacion/4.png" class="d-block w-100" alt="Equitación 4"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/equitacion/5.png" class="d-block w-100" alt="Equitación 5"></div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carruselEquitacion" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carruselEquitacion" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="mb-5">
                <h6>Club de Muay Thai</h6>
                <p>El Muay Thai es un arte marcial tailandés que se caracteriza por el uso de los puños, codos, rodillas y pies. También se le conoce como boxeo tailandés o el arte de las ocho extremidades.</p>
                <ul>
                    <li>Es un deporte de combate cuerpo a cuerpo</li>
                    <li>Se practica de pie</li>
                    <li>Se utilizan puñetazos, codazos, patadas, rodillazos, lanzamientos y agarres</li>
                    <li>Se suele acompañar de música Sarama</li>
                    <li>Los combates se desarrollan en un cuadrilátero acordonado</li>
                    <li>Los luchadores usan protectores bucales e inguinales</li>
                    <li>Los luchadores se dividen en pesos</li>
                </ul>
                <div id="carruselMuayThai" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                    <div class="carousel-inner">
                        <div class="carousel-item active"><img src="/assets/img/bienestarEstudiantil/servicios/muay-thai/1.png" class="d-block w-100" alt="Muay Thai 1"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/muay-thai/2.png" class="d-block w-100" alt="Muay Thai 2"></div>
                        <div class="carousel-item"><img src="/assets/img/bienestarEstudiantil/servicios/muay-thai/3.png" class="d-block w-100" alt="Muay Thai 3"></div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carruselMuayThai" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carruselMuayThai" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div class="mt-4 text-center">
                <h5>¡No dudes en contactarnos!</h5>
                <p>
                    <strong>Correos electrónicos:</strong><br>
                    asistencia.bienestar@superarse.edu.ec<br>
                    becas@superarse.edu.ec<br>
                    coordinacion.bienestar@superarse.edu.ec<br><br>
                    <strong>Teléfono:</strong> 02-3 930 980 ext. 111<br>
                    <strong>WhatsApp:</strong> 099 840 9293
                </p>
            </div>`,
        "Orientación vocacional": `<h3 class="text-uppercase text-primary mb-3">Orientación vocacional</h3>
            <p>Si no te encuentras seguro de estar en la carrera de tus sueños, no te preocupes, la Coordinación de Bienestar Institucional te ayudará a la elección de tu profesión de acuerdo a tus habilidades, destrezas y gustos personales. De este modo, nos aseguramos de que te encuentres en el lugar más adecuado para ti.</p>
            <p>Este proceso se realiza dentro del proceso de admisión de estudiantes, es decir, en los primeros niveles de tu formación en la educación superior. Además, se complementa con el <strong>Test de Validación de Conocimientos</strong> que principalmente posee como componentes dos grandes áreas: Comunicación Oral y Escrita; Matemáticas.</p>
            <p><strong>¡Recuerda que siempre buscamos la mejor opción para ti!</strong></p>
            <div style="text-align:center; margin: 20px 0;">
                <img src="/assets/img/bienestarEstudiantil/servicios/acompañamiento.png" alt="Orientación Vocacional" style="max-width:300px; width:100%; border-radius:10px;">
            </div>
            <div style="text-align:center; margin-top:20px;">
                <h5>¡No dudes en contactarnos!</h5>
                <p>
                    <strong>Correos electrónicos:</strong> asistencia.bienestar@superarse.edu.ec; becas@superarse.edu.ec; coordinacion.bienestar@superarse.edu.ec.<br>
                    <strong>Teléfono:</strong> 02-3 930 980 ext. 111<br>
                    <strong>WhatsApp:</strong> 099 840 9293
                </p>
            </div>`,
        "Becas": `<h3 class="text-uppercase text-primary mb-3">Becas</h3>
            <p>En el Instituto Superior Tecnológico Superarse comprendemos que la educación es un derecho indispensable. Estamos comprometidos para lograr la igualdad de oportunidades y cumplir con las políticas de acción afirmativa. Nuestro apoyo socioeconómico asegura la permanencia del estudiante y evita que la vulnerabilidad económica limite su acceso a la educación superior.</p>
            <h4>Contamos con las siguientes becas:</h4>
            <ul>
                <li><strong>Beca por Excelencia Académica:</strong> Dirigida a estudiantes con un desempeño académico sobresaliente en la Educación Secundaria o en el Instituto Superior Tecnológico Superarse.</li>
                <li><strong>Beca por Situación Socioeconómica:</strong> Dirigida a estudiantes en situación de vulnerabilidad socioeconómica, por desempleo, escasos recursos económicos, movilidad humana o situación familiar.</li>
                <li><strong>Beca para la Inclusión:</strong> Dirigida a personas con discapacidad o enfermedades catastróficas, Pueblos y Nacionalidades Indígenas, víctimas de violencia basada en género y Población LGBTIQ+.</li>
                <li><strong>Beca Especial:</strong> Dirigida a estudiantes destacados en deporte o cultura; educación continua, clubes institucionales, colaboración al Instituto y a quienes tengan un Convenio Interinstitucional (Beca Superarse).</li>
            </ul>
            <h4>¿A qué ámbitos no se aplica la beca?</h4>
            <ul>
                <li>Matrícula e inscripción</li>
                <li>Curso de idioma (inglés)</li>
                <li>Valores por insumos para prácticas y salidas académicas</li>
                <li>Material didáctico</li>
                <li>Seguro estudiantil</li>
            </ul>
            <h4>¿Cómo se solicita una beca?</h4>
            <ol>
                <li>Enviar un correo con todos los documentos requeridos, colocando como asunto el tipo de beca, a <strong>becas@superarse.edu.ec</strong>.</li>
                <li>La respuesta será enviada en máximo 3 días laborales (72 horas) desde la recepción del correo.</li>
                <li>Si es aprobada, Coordinación de Bienestar Institucional se comunicará con los estudiantes beneficiados para la firma del Contrato de Beca.</li>
            </ol>
            <p><em>Nota:</em> Los documentos enviados por correo también deben entregarse físicamente en el Instituto, caso contrario no se emitirá el contrato.</p>
            <h4>Conoce más:</h4>
            <div style="text-align:center; margin: 20px 0;">
                <a href="/assets/docs/Becas/Guia_BecasOct2025.pdf" target="_blank" class="btn btn-primary m-2">Guía del Reglamento de Becas</a>
                <a href="/assets/docs/Becas/FICHA_SOLICITUD_BECA_nov24-abr25.pdf" target="_blank" class="btn btn-primary m-2">Ficha de Solicitud de Beca</a>
                <a href="/assets/docs/Becas/FICHA_SOCIOECONOMICA_V1.pdf" target="_blank" class="btn btn-primary m-2">Ficha Socioeconómica</a>
            </div>
            <div style="text-align:center; margin-top:20px;">
                <h5>¡No dudes en contactarnos!</h5>
                <p>
                    <strong>Correos electrónicos:</strong> asistencia.bienestar@superarse.edu.ec; becas@superarse.edu.ec; coordinacion.bienestar@superarse.edu.ec.<br>
                    <strong>Teléfono:</strong> 02-3 930 980 ext. 111<br>
                    <strong>WhatsApp:</strong> 099 840 9293
                </p>
            </div>`,
        "Propuesta Pedagógica": `<h2 class="text-uppercase text-primary mb-3">Propuesta Pedagógica</h2>
            <p>Aquí puedes visualizar nuestra propuesta pedagógica directamente.</p>
            <div class="pdf-container" style="width: 100%;">
                <canvas id="pdf-viewer-propuesta" style="width: 100%; border: 1px solid #ccc;"></canvas>
                <div class="text-center mt-3 pdf-paginator" data-canvas-id="pdf-viewer-propuesta">
                    <button data-action="prev" class="btn btn-primary mx-2">Anterior</button>
                    <span class="mx-2">Página: <span class="page-num">0</span> / <span class="page-count">0</span></span>
                    <button data-action="next" class="btn btn-primary mx-2">Siguiente</button>
                </div>
            </div>`,
    };

    const academicPlansContainer = document.getElementById("academic-plans-container");
    const dynamicContent = document.getElementById("dynamic-content");

    // Lógica para crear el menú lateral
    for (const title in bienestarData) {
        if (bienestarData.hasOwnProperty(title)) {
            const button = document.createElement("a");
            button.href = "#";
            button.classList.add("list-group-item", "list-group-item-action");
            button.textContent = title;

            button.addEventListener("click", function (e) {
                e.preventDefault();
                document.querySelectorAll(".list-group-item-action").forEach(btn => btn.classList.remove("active"));
                this.classList.add("active");
                dynamicContent.innerHTML = bienestarData[title];

                // Verificar si se debe cargar un PDF
                if (title === "Propuesta Pedagógica") {
                    setTimeout(() => {
                        loadPdfAndRender(
                            '/assets/docs/servicios/propuestaPedagogica/PROPUESTA_PEDAGOGICA.pdf',
                            'pdf-viewer-propuesta'
                        );
                    }, 100);
                }
            });
            academicPlansContainer.appendChild(button);
        }
    }

    // Activar el primer botón por defecto al cargar la página
    const firstButton = academicPlansContainer.querySelector(".list-group-item-action");
    if (firstButton) {
        firstButton.click();
    }

    // NUEVA LÓGICA PARA LOS BOTONES PRINCIPALES
    window.showContent = function(service) {
        // Remover la clase 'active' de todos los botones del menú lateral
        document.querySelectorAll(".list-group-item-action").forEach(btn => btn.classList.remove("active"));
        
        let content = '';

        if (service === 'salud') {
            content = `
                <h2 class="text-uppercase text-primary mb-3" style="text-align: center;">En Caso de Violencia Basada en Genero</h2>
                <p style="text-align: justify;">El presente formulario tiene como objetivo recopilar denuncias de los miembros de la comunidad educativa del Instituto Superior Tecnológico Superarse sobre cualquier tipo de violencia contemplada en el Protocolo de Prevención y Actuación ante casos de acoso, discriminación y violencia basada en género u orientación sexual, incluyendo manifestaciones físicas, psicológicas, sexuales, verbales, cibernéticas, simbólicas u otras formas establecidas en dicho protocolo. Desarrollado por la Coordinación de Bienestar Institucional, este instrumento busca identificar posibles situaciones de vulneración de derechos asociadas a prejuicios de género, identidad sexual, origen étnico-cultural, condición socioeconómica u otros factores discriminatorios, permitiendo activar los mecanismos de acompañamiento, investigación y sanción correspondientes para garantizar un entorno educativo libre de violencia. La información obtenida será tratada con confidencialidad y utilizada para implementar medidas preventivas y correctivas que fortalezcan la convivencia institucional.</p>
                <div class="d-flex justify-content-center">
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScKuypiP-LoLt4-QtKw4ycF37TJSXwY4YZZk_XN9rP519yYfw/viewform" class="btn btn-danger mx-2" target="_blank">
                        BOTÓN DE AYUDA
                    </a>
                </div>
            `;
            dynamicContent.innerHTML = content;

        } else if (service === 'apoyo') {
            // Contenido del Plan de Igualdad
            content = `
                <div class="row">
                    <div class="col-lg-4">
                        <h6 class="mb-3">2023</h6>
                        <div class="list-group pdf-submenu" role="tablist">
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2023/PLAN-2023.PDF" data-canvas-id="pdf-viewer-igualdad">Plan de Igualdad 2023</a>
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2023/DIAGNOSTICO-2023.PDF" data-canvas-id="pdf-viewer-igualdad">Diagnóstico del Plan de Igualdad</a>
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2023/RESULTADOS-2023.PDF" data-canvas-id="pdf-viewer-igualdad">Resultados del plan de igualdad</a>
                            <br />
                        </div>
                        <h6 class="mb-3">2024</h6>
                        <div class="list-group pdf-submenu" role="tablist">
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2024/PLAN-2024.PDF" data-canvas-id="pdf-viewer-igualdad">Plan de Igualdad 2024</a>
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2024/DIAGNOSTICO-2024.PDF" data-canvas-id="pdf-viewer-igualdad">Diagnóstico del Plan de Igualdad</a>
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2024/RESULTADOS-2024.PDF" data-canvas-id="pdf-viewer-igualdad">Resultados del plan de igualdad</a>
                            <br />
                        </div>
                        <h6 class="mb-3">2025</h6>
                        <div class="list-group pdf-submenu" role="tablist">
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2025/PLAN-2025.PDF" data-canvas-id="pdf-viewer-igualdad">Plan de Igualdad 2025</a>
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="/assets/docs/planDeigualdad/2025/DIAGNOSTICO-2025.PDF" data-canvas-id="pdf-viewer-igualdad">Diagnóstico del Plan de Igualdad</a>
                            <a class="list-group-item list-group-item-action" href="#" data-pdf-src="#" data-canvas-id="pdf-viewer-igualdad">Resultados del plan de igualdad</a>
                        </div>
                    </div>
                    <div class="col-lg-8">
                        <div class="pdf-viewer-container border rounded shadow-sm bg-white">
                            <canvas id="pdf-viewer-igualdad" class="pdf-canvas"></canvas>
                        </div>
                        <div class="pdf-paginator" data-canvas-id="pdf-viewer-igualdad">
                            <button class="btn btn-primary" data-action="prev">Anterior</button>
                            <span class="page-info">Página: <span class="page-num">0</span> / <span class="page-count">0</span></span>
                            <button class="btn btn-primary" data-action="next">Siguiente</button>
                        </div>
                    </div>
                </div>
            `;
            dynamicContent.innerHTML = content;

            // Manejar eventos de los sub-botones del Plan de Igualdad
            setTimeout(() => {
                const firstLink = document.querySelector('#dynamic-content .pdf-submenu .list-group-item-action');
                if (firstLink) {
                    firstLink.classList.add('active');
                    loadPdfAndRender(firstLink.dataset.pdfSrc, firstLink.dataset.canvasId);
                }

                document.querySelectorAll('#dynamic-content .pdf-submenu .list-group-item-action').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        document.querySelectorAll('#dynamic-content .pdf-submenu .list-group-item-action').forEach(el => el.classList.remove('active'));
                        link.classList.add('active');
                        const pdfUrl = link.dataset.pdfSrc;
                        const canvasId = link.dataset.canvasId;
                        loadPdfAndRender(pdfUrl, canvasId);
                    });
                });

                document.querySelectorAll('#dynamic-content .pdf-paginator button').forEach(button => {
                    button.addEventListener('click', (e) => {
                        const action = e.target.dataset.action;
                        const paginator = e.target.closest('.pdf-paginator');
                        const canvasId = paginator.dataset.canvasId;
                        const state = pdfStates[canvasId];
                        if (!state) return;
                        if (action === 'prev' && state.pageNum > 1) {
                            renderPage(canvasId, state.pageNum - 1);
                        } else if (action === 'next' && state.pageNum < state.pdfDoc.numPages) {
                            renderPage(canvasId, state.pageNum + 1);
                        }
                    });
                });
            }, 100);
        }
    };
});

// Configurar botones de paginador para el menú lateral
document.addEventListener('click', function(e){
    if(e.target.dataset.action){
        const paginator = e.target.closest('.pdf-paginator');
        if (!paginator) return;
        const canvasId = paginator.dataset.canvasId;
        const state = pdfStates[canvasId];
        if(!state) return;
        if(e.target.dataset.action === 'prev' && state.pageNum > 1) renderPage(canvasId, state.pageNum-1);
        if(e.target.dataset.action === 'next' && state.pageNum < state.pdfDoc.numPages) renderPage(canvasId, state.pageNum+1);
    }
});