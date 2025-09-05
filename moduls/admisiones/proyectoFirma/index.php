<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contrato de Matrícula</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        /* Estilos CSS personalizados para las curvas que no existen en Tailwind */
        .header-band {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 80%);
        }

        .footer-band {
            clip-path: polygon(0% 20%, 100% 0, 100% 100%, 0% 100%);
        }

        .document-text input {
            display: inline-block;
            vertical-align: middle;
            text-align: center;
        }

        /* Arreglo para que los input no sean anchos por defecto */
        .document-text input.w-full {
            width: auto !important;
        }
    </style>
</head>

<body class="bg-gray-100 flex justify-center items-start min-h-screen p-8">

    <div class="bg-white rounded-xl shadow-lg max-w-4xl w-full border border-gray-200 overflow-hidden">
        <div class="header-band w-full h-32 bg-gradient-to-r from-[#005a9c] via-[#0088cc] to-[#4299e1] relative">
            <div class="absolute inset-0 flex justify-between items-center px-8 py-4">
                <img src="assets/img/Logo-Superarse-Negativo.png" alt="Logo Superarse Tecnológico" class="h-20 drop-shadow-md">
                <h1 class="text-white text-2xl font-bold text-right flex-grow">CONTRATO DE INSCRIPCIÓN Y MATRÍCULA</h1>
            </div>
        </div>

        <form id="contract-form" action="procesar_contrato.php" method="post" class="p-10">
            <p class="text-base text-gray-700 leading-relaxed text-justify">
                Yo, <input type="text" name="nombre" placeholder="Nombre completo" class="border-b-2 border-gray-400 focus:border-blue-500 bg-transparent text-center px-1" style="width: 300px;">, portador/a de la cédula de ciudadanía/pasaporte N° <input type="text" name="cedula" placeholder="Nro. de cédula/pasaporte" class="border-b-2 border-gray-400 focus:border-blue-500 bg-transparent text-center px-1" style="width: 200px;">, por medio del presente Contrato de Inscripción y Matrícula declaro que me he matriculado en el <strong class="font-bold">Instituto Superior Tecnológico Superarse</strong>, en la CARRERA de:
                <select id="program" name="carrera" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    <option value="">Seleccione</option>
                    <option value="Tecnólogo en Instrumentación Quirúrgica">Tecnólogo en Instrumentación Quirúrgica</option>
                    <option value="Tecnólogo en Educación Básica">Tecnólogo en Educación Básica</option>
                    <option value="Tecnología Superior en Enfermería Veterinaria">Tecnología Superior en Enfermería Veterinaria</option>
                    <option value="Tecnólogo en Producción Animal">Tecnólogo en Producción Animal</option>
                    <option value="Técnico Superior en Marketing Digital">Técnico Superior en Marketing Digital</option>
                    <option value="Seguridad e Higiene del Trabajo">Seguridad e Higiene del Trabajo</option>
                    <option value="Seguridad y Prevención de Riesgos Laborales">Seguridad y Prevención de Riesgos Laborales</option>
                    <option value="Técnico Superior en Administración">Técnico Superior en Administración</option>
                    <option value="Tecnología Superior en Topografía">Tecnología Superior en Topografía</option>
                    <option value="Tecnólogo en Minería">Tecnólogo en Minería</option>
                </select>, en el período académico <input type="text" name="inicio_periodo" class="border-b-2 border-gray-400 focus:border-blue-500 bg-transparent text-center px-1" placeholder="mes y año de inicio" style="width: 200px;"> <strong class="font-bold">(mes y año de inicio)</strong> <input type="text" name="fin_periodo" class="border-b-2 border-gray-400 focus:border-blue-500 bg-transparent text-center px-1" placeholder="mes y año de culminación" style="width: 200px;"> <strong class="font-bold">(mes y año de culminación)</strong>; por lo que, en mi calidad de ESTUDIANTE me comprometo y obligo de forma expresa, libre y voluntaria a lo siguiente:
            </p>

            <div class="document-text mt-8">
                <ul class="list-none pl-4 text-gray-700 text-justify">
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">Por medio de la presente, autorizo de manera libre, expresa e informada al Instituto Superior Tecnológico Superarse para que almacene, recolecte y procese mis datos personales con fines académicos e institucionales, de conformidad con la Ley Orgánica de Protección de Datos personales. Asimismo, autorizo que esta información pueda ser compartida con los entes de control y autoridades competentes, cuando así corresponda o sea requerida a la normativa vigente.</li>
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">De acuerdo al <strong class="font-bold">Artículo 37</strong> del <strong class="font-bold">Reglamento de Estudiantes</strong> los valores ingresados al instituto por concepto de matrículas y aranceles no serán devueltos por el Instituto Superior Tecnológico Superarse.</li>
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">El alumno recibirá las credenciales de acceso a la plataforma de Gestión Académica utilizada por el Instituto, incluyendo el software institucional y todos los contenidos disponibles en dicha plataforma.</li>
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">Respetar la visión, misión, principios, fines y objetivos institucionales del Instituto Superior Tecnológico Superarse, de acuerdo a lo establecido en el Estatuto de la institución.</li>
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">Reconozco que la matrícula tiene vigencia desde la firma del presente contrato, correspondiente al periodo académico en curso, y me comprometo a cumplir con la Ley Orgánica de Educación Superior, el Reglamento General de los Institutos Superiores, el Código de Ética, el Estatuto y los Reglamentos Internos del Instituto Superior Tecnológico Superarse, aceptando que el incumplimiento de estas disposiciones podrá generar procesos disciplinarios, administrativos y/o legales en mi contra.</li>
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">Conocer que al momento de matricularme en el Instituto Superior Tecnológico Superarse bajo la modalidad de CRÉDITO EDUCATIVO estoy asumiendo la obligación de cancelar la totalidad de los aranceles generados y aprobados por el Órgano Colegiado Superior, me comprometo a cancelar las cuotas planteadas en las fechas indicadas por el Instituto Superior Tecnológico Superarse</li>
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">Conocer que el retiro académico legal se procederá únicamente presentando una solicitud dirigida a la Coordinación de Bienestar Institucional y cubriendo el costo del derecho que implique este proceso.</li>
                    <li class="relative pl-4 mb-4 before:content-['•'] before:absolute before:left-0 before:font-bold before:text-gray-600">Respetar y cumplir los Reglamentos Internos del Instituto Superior Tecnológico Superarse; y, por consiguiente, aceptar que el incumplimiento de los compromisos establecidos generará en mi contra procesos disciplinarios, administrativos y/o legales, cumpliendo todas las obligaciones determinadas para los estudiantes del Instituto Superior Tecnológico Superarse.</li>
                </ul>
            </div>

            <div class="signature-container mt-8 text-center">
                <p class="font-bold">FIRMA DEL ESTUDIANTE</p>
                <canvas id="signature-pad" class="border-2 border-gray-400 rounded-lg bg-gray-50 cursor-crosshair w-full max-w-md h-52 mt-2 mx-auto"></canvas><br>
                <button type="button" id="limpiar" class="bg-red-600 text-white border-none py-3 px-6 text-base rounded-lg cursor-pointer mt-4 transition-colors hover:bg-red-700">Limpiar Firma</button><br>
                <input type="hidden" name="firma_data" id="firma_data">
                <br>
                <p class="cc-label mt-4">C.C. <input type="text" name="firma_cc" placeholder="Número de cédula" class="border-b-2 border-gray-400 focus:border-blue-500 bg-transparent text-center px-1"></p>
                <p class="asesor-label mt-4">Asesor:
                <select id="asesor" name="asesor" class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required>
                    <option value="">Seleccione un Asesor</option>
                    <option value="Luis Granja">Luis Granja</option>
                    <option value="Diana Andrango">Diana Andrango</option>
                    <option value="Mayra Segarra">Mayra Segarra</option>
                </select></p>
                <br>
            </div>

            <div class="button-group flex justify-center gap-4 mt-8">
                <button type="submit" class="submit-button p-4 text-white border-none rounded-lg text-lg cursor-pointer transition-colors w-full max-w-xs bg-green-600 hover:bg-green-700" name="action" value="send_and_download">Enviar Contrato y Descargar</button>
                <button type="submit" class="download-button p-4 text-white border-none rounded-lg text-lg cursor-pointer transition-colors w-full max-w-xs bg-blue-500 hover:bg-blue-600" name="action" value="download_only">Descargar Solo PDF</button>
            </div>
        </form>
        
        <div class="footer-band w-full h-32 bg-gradient-to-r from-[#005a9c] via-[#0088cc] to-[#4299e1] relative flex justify-between items-end px-8 py-4 box-border text-white mt-8">
            <p class="m-0">Página 1 de 1</p>
            <p class="m-0">ISTS-GD-02-001</p>
        </div>
    </div>

    <script>
        // Variables para el pad de firma
        const canvas = document.getElementById('signature-pad');
        const ctx = canvas.getContext('2d');
        const clearButton = document.getElementById('limpiar');
        const signatureInput = document.getElementById('firma_data');
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        function resizeCanvas() {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            ctx.strokeStyle = '#2d3748';
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
        }

        function draw(e) {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = (e.clientX || e.touches[0].clientX) - rect.left;
            const y = (e.clientY || e.touches[0].clientY) - rect.top;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            [lastX, lastY] = [x, y];
        }

        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
        });
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => {
            isDrawing = false;
            signatureInput.value = canvas.toDataURL();
        });
        canvas.addEventListener('mouseout', () => isDrawing = false);

        canvas.addEventListener('touchstart', (e) => {
            isDrawing = true;
            const rect = canvas.getBoundingClientRect();
            [lastX, lastY] = [e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top];
            e.preventDefault();
        });
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', () => {
            isDrawing = false;
            signatureInput.value = canvas.toDataURL();
        });

        clearButton.addEventListener('click', () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            signatureInput.value = '';
        });

        window.addEventListener('load', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
    </script>
</body>

</html>