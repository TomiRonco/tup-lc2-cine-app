(function () {
    emailjs.init('IHJR_LzQ6ZLe09SZ8');
})();

const form = document.querySelector('.form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const name = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('mensaje').value;

    // Enviar el correo electrónico
    emailjs.send('service_buib11c', 'template_0xpvxun', {
        from_name: name,
        from_email: email,
        message: message
    })
        .then(function () {
            // Éxito: el correo electrónico se envió correctamente
            alert('El mensaje ha sido enviado correctamente.');
            form.reset();
        }, function (error) {
            // Error: el correo electrónico no se pudo enviar
            console.error('Error al enviar el correo electrónico:', error);
            alert('Ocurrió un error al enviar el mensaje. Por favor, inténtalo nuevamente.');
        });
});