//Establecer la conexion con el servidor para crear los "web sockets"
const socket = io();//Socket for front-end

//Query DOM
const mensaje = document.getElementById('message');
const handle = document.getElementById('handle');
const boton = document.getElementById('enviar');
const salida = document.getElementById('salida');
const feedback = document.getElementById('feedback');

//Eventos
boton.addEventListener('click', () => {
    //Emitir un evento desde el socket, hacia el servidor (Emitir un mensaje)
    socket.emit('chat', {
        mensaje: mensaje.value,
        handle: handle.value
    });
    mensaje.value = "";
});

mensaje.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

//Listen para eventos en el front end
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    salida.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.mensaje +'</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>' + data + ' está escribiendo...' + '</p></em>';
})
