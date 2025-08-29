// Get the WhatsApp URL from the data attribute
var whatsappUrl = button.data("whatsapp-url");

// Find the modal body content area and append the WhatsApp link
if (whatsappUrl) {
  var whatsappLinkHtml = '<a href="' + whatsappUrl + '" class="btn btn-success mt-3" target="_blank">' +
                         '<i class="fab fa-whatsapp"></i> Contáctanos por WhatsApp' +
                         '</a>';
  modal.find("#modalText").append(whatsappLinkHtml);
}