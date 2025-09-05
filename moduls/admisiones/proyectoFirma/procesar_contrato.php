<?php
// Incluye el autoload de Composer
require 'vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Limpia cualquier salida accidental antes de la generación del PDF
ob_start();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // 1. Recibir los datos del formulario
    $nombre = $_POST['nombre'] ?? '';
    $cedula = $_POST['cedula'] ?? '';
    $carrera = $_POST['carrera'] ?? '';
    $inicio_periodo = $_POST['inicio_periodo'] ?? '';
    $fin_periodo = $_POST['fin_periodo'] ?? '';
    $firma_data = $_POST['firma_data'] ?? '';
    $firma_cc = $_POST['firma_cc'] ?? '';
    $asesor = $_POST['asesor'] ?? '';
    $action = $_POST['action'] ?? '';

    // Rutas de las imágenes
    $logo_path = __DIR__ . '/assets/img/Logo-Superarse-Negativo.png';

    // 2. Crear el contenido HTML del PDF
    $html_content = '
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            /* ESTILOS DEL CUERPO DEL DOCUMENTO */
            body { 
                font-family: Arial, sans-serif; 
                line-height: 1.8; 
                color: #4a5568; 
            }
            p { 
                margin: 0 0 1rem 0; 
                text-align: justify;
            }
            ul {
                list-style: none;
                padding-left: 1rem;
                text-align: justify;
            }
            ul li {
                position: relative;
                padding-left: 1.5rem;
                margin-bottom: 1rem;
            }
            ul li::before {
                content: "•";
                color: #4a5568;
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }
            .signature-section { 
                text-align: center; 
                margin-top: 2rem; 
            }
            .signature-section img { 
                max-width: 400px; 
                margin: 0 auto;
            }
        </style>
    </head>
    <body>
        <p>Yo, <strong>' . htmlspecialchars($nombre) . '</strong>, portador/a de la cédula de ciudadanía/pasaporte N° <strong>' . htmlspecialchars($cedula) . '</strong>, por medio del presente Contrato de Inscripción y Matrícula declaro que me he matriculado en el <strong style="font-weight: bold;">Instituto Superior Tecnológico Superarse</strong>, en la CARRERA de: <strong>' . htmlspecialchars($carrera) . '</strong>, en el período académico <strong>' . htmlspecialchars($inicio_periodo) . '</strong> <strong>(mes y año de inicio)</strong> <strong>' . htmlspecialchars($fin_periodo) . '</strong> <strong>(mes y año de culminación)</strong>; por lo que, en mi calidad de ESTUDIANTE me comprometo y obligo de forma expresa, libre y voluntaria a lo siguiente:</p>
        
        <ul>
            <li>Por medio de la presente, autorizo de manera libre, expresa e informada al Instituto Superior Tecnológico Superarse para que almacene, recolecte y procese mis datos personales con fines académicos e institucionales, de conformidad con la Ley Orgánica de Protección de Datos personales. Asimismo, autorizo que esta información pueda ser compartida con los entes de control y autoridades competentes, cuando así corresponda o sea requerida a la normativa vigente.</li>
            <li>De acuerdo al <strong>Artículo 37</strong> del <strong>Reglamento de Estudiantes</strong> los valores ingresados al instituto por concepto de matrículas y aranceles no serán devueltos por el Instituto Superior Tecnológico Superarse.</li>
            <li>El alumno recibirá las credenciales de acceso a la plataforma de Gestión Académica utilizada por el Instituto, incluyendo el software institucional y todos los contenidos disponibles en dicha plataforma.</li>
            <li>Respetar la visión, misión, principios, fines y objetivos institucionales del Instituto Superior Tecnológico Superarse, de acuerdo a lo establecido en el Estatuto de la institución.</li>
            <li>Reconozco que la matrícula tiene vigencia desde la firma del presente contrato, correspondiente al periodo académico en curso, y me comprometo a cumplir con la Ley Orgánica de Educación Superior, el Reglamento General de los Institutos Superiores, el Código de Ética, el Estatuto y los Reglamentos Internos del Instituto Superior Tecnológico Superarse, aceptando que el incumplimiento de estas disposiciones podrá generar procesos disciplinarios, administrativos y/o legales en mi contra.</li>
            <li>Conocer que al momento de matricularme en el Instituto Superior Tecnológico Superarse bajo la modalidad de CRÉDITO EDUCATIVO estoy asumiendo la obligación de cancelar la totalidad de los aranceles generados y aprobados por el Órgano Colegiado Superior, me comprometo a cancelar las cuotas planteadas en las fechas indicadas por el Instituto Superior Tecnológico Superarse</li>
            <li>Conocer que el retiro académico legal se procederá únicamente presentando una solicitud dirigida a la Coordinación de Bienestar Institucional y cubriendo el costo del derecho que implique este proceso.</li>
            <li>Respetar y cumplir los Reglamentos Internos del Instituto Superior Tecnológico Superarse; y, por consiguiente, aceptar que el incumplimiento de los compromisos establecidos generará en mi contra procesos disciplinarios, administrativos y/o legales, cumpliendo todas las obligaciones determinadas para los estudiantes del Instituto Superior Tecnológico Superarse.</li>
        </ul>

        <div class="signature-section">
            <p><strong>FIRMA DEL ESTUDIANTE</strong></p>
            <img src="' . htmlspecialchars($firma_data) . '" alt="Firma del estudiante">
            <p>C.C. <strong>' . htmlspecialchars($firma_cc) . '</strong></p>
            <p>Asesor: <strong>' . htmlspecialchars($asesor) . '</strong></p>
        </div>
    </body>
    </html>';

    // 3. Generar el PDF con mPDF
    $mpdf = new \Mpdf\Mpdf([
        'mode' => 'utf-8',
        'format' => 'A4',
        'margin_left' => 10,
        'margin_right' => 10,
        'margin_top' => 60, // Espacio para el encabezado
        'margin_bottom' => 50, // Espacio para el pie de página
        'defaultPagebreakType' => 'slice' // Esta línea soluciona el problema de los espacios
    ]);
    
    // Define el encabezado usando CSS y HTML (mPDF lo soporta nativamente)
    $header_html = '
    <div style="
        width: 100%;
        height: 120px;
        background-image: linear-gradient(to right, #005a9c, #0088cc, #4299e1);
        color: white;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
    ">
        <img src="' . $logo_path . '" alt="Logo Superarse Tecnológico" style="height: 80px; width: auto; vertical-align: middle;">
        <h1 style="font-size: 1.5rem; font-weight: bold; text-align: right; flex-grow: 1; margin-left: 1rem;">
            CONTRATO DE INSCRIPCIÓN Y MATRÍCULA
        </h1>
    </div>';

    // Define el pie de página usando CSS y HTML
$footer_html = '
<div style="
    width: 100%;
    height: 120px;
    background-image: linear-gradient(to right, #005a9c, #0088cc, #4299e1);
    color: white;
    padding: 1rem 2rem;
    box-sizing: border-box;
">
    <table width="100%" style="color: white;">
        <tr>
            <td style="text-align: left;">
                Página {PAGENO} de {nbpg}
            </td>
            <td style="text-align: right;">
                ISTS-GD-02-001
            </td>
        </tr>
    </table>
</div>';

    // Establece el encabezado y el pie de página en el documento
    $mpdf->SetHTMLHeader($header_html);
    $mpdf->SetHTMLFooter($footer_html);

    // Escribe el contenido principal en el PDF
    $mpdf->WriteHTML($html_content);

    // 4. Lógica de envío de correo y descarga del PDF
    $pdf_output = $mpdf->Output('contrato.pdf', 'S');

    if ($action === 'send_and_download') {
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host       = 'smtp.office365.com';
            $mail->SMTPAuth   = true;
            $mail->Username   = 'matias.valdivieso@superarse.edu.ec';
            $mail->Password   = 'TU_CONTRASEÑA_DE_APLICACIÓN';
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail->Port       = 587;

            $mail->setFrom('matias.valdivieso@superarse.edu.ec', 'Instituto Superarse');
            $mail->addAddress('admisiones@superarse.edu.ec', 'Destinatario Principal');
            $mail->addCC('luis.granja@superarse.edu.ec', 'Copia 1');
            $mail->addCC('diana.andrango@superarse.edu.ec', 'Copia 2');
            $mail->addCC('mayra.segarra@superarse.edu.ec', 'Copia 3');
            
            $mail->isHTML(true);
            $mail->Subject = 'Contrato de Matrícula de ' . $nombre;
            $mail->Body    = 'Hola,<br><br>Adjuntamos el contrato de matrícula de **' . $nombre . '** para su revisión.<br><br>Saludos,<br>Instituto Superarse';

            $filename = 'contrato_' . str_replace(' ', '_', $nombre) . '.pdf';
            $mail->addStringAttachment($pdf_output, $filename, 'base64', 'application/pdf');

            $mail->send();
        } catch (Exception $e) {
            error_log("Error al enviar el correo: " . $mail->ErrorInfo);
        }
    }

    // 5. Descargar el PDF en el navegador del usuario
    ob_end_clean();
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="contrato.pdf"');
    echo $pdf_output;

} else {
    echo "Acceso no válido.";
}