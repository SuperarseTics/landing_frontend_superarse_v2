<?php

// Revisa si la solicitud es de tipo POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Sanitiza y obtén los datos del formulario
    $nombre = strip_tags(trim($_POST["nombre"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $descripcion = trim($_POST["description"]);

    // Valida que los datos no estén vacíos
    if (empty($nombre) || empty($descripcion) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Por favor, completa el formulario y asegúrate de que el correo electrónico sea válido.";
        exit;
    }

    // Configura el correo de destino
    $recipient = "luis.granja@superarse.edu.ec"; // CAMBIA ESTO por tu dirección de correo
    $subject = "Nuevo requerimiento de admisión de: $nombre";

    // Construye el contenido del correo
    $email_content = "Nombre: $nombre\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Requerimiento:\n$descripcion\n";

    // Construye los encabezados del correo
    $email_headers = "From: $nombre <$email>";

    // Envía el correo
    if (mail($recipient, $subject, $email_content, $email_headers)) {
        http_response_code(200);
        echo "¡Gracias! Tu mensaje ha sido enviado.";
    } else {
        http_response_code(500);
        echo "Oops! Algo salió mal y no pudimos enviar tu mensaje.";
    }

} else {
    // Si no es una solicitud POST, devuelve un código de error 403 (Prohibido)
    http_response_code(403);
    echo "Hubo un problema con tu envío, por favor intenta de nuevo.";
}

?>