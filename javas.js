document.getElementById('formulario').addEventListener('submit', function(event) {
  event.preventDefault();

  // Obtener los valores de los campos
  let nombre = document.getElementById('nombre').value.trim();
  let correo = document.getElementById('correo').value.trim();
  let contrasena = document.getElementById('contrasena').value.trim();
  let repiteContrasena = document.getElementById('repite-contrasena').value.trim();

  // Validar que todos los campos estén llenos
  if (nombre === '' || correo === '' || contrasena === '' || repiteContrasena === '') {
    showAlert('Por favor, rellene todos los campos.', 'alert-danger');
    return;
  }

  // Validar formato de correo electrónico
  let correoRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!correoRegExp.test(correo)) {
    showAlert('Por favor, introduzca un correo electrónico válido.', 'alert-danger');
    return;
  }

  // Validar que las contraseñas coincidan
  if (contrasena !== repiteContrasena) {
    showAlert('Las contraseñas no coinciden.', 'alert-danger');
    return;
  }

  // Validar fortaleza de la contraseña (implementar según tus criterios)

  // Si todas las validaciones pasan, guardar en localStorage
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  let usuario = {
    nombre: nombre,
    correo: correo,
    contrasena: contrasena
  };
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  // Mostrar mensaje de éxito y redirigir
  showAlert('Usuario creado correctamente. Redireccionando...', 'alert-success');
  setTimeout(function() {
    window.location.href = 'vista_usuarios.html';
  }, 3000);
});

function showAlert(message, className) {
  // Eliminar alertas previas
  let alerts = document.querySelectorAll('.alert');
  alerts.forEach(function(alert) {
    alert.remove();
  });

  // Crear elemento de alerta
  let alertElement = document.createElement('div');
  alertElement.className = 'alert ' + className;
  alertElement.appendChild(document.createTextNode(message));

  // Añadir alerta al DOM
  let container = document.querySelector('.container');
  container.insertBefore(alertElement, document.querySelector('form'));

  // Desaparecer después de 3 segundos
  setTimeout(function() {
    alertElement.remove();
  }, 3000);
}
// Recuperar usuarios del localStorage
let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

// Mostrar usuarios en cards
let usuariosContainer = document.getElementById('usuarios-container');
usuarios.forEach(function(usuario) {
    let card = document.createElement('div');
    card.className = 'card mb-3';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let nombre = document.createElement('h5');
    nombre.className = 'card-title';
    nombre.textContent = usuario.nombre;

    let correo = document.createElement('p');
    correo.className = 'card-text';
    correo.textContent = usuario.correo;

    cardBody.appendChild(nombre);
    cardBody.appendChild(correo);
    card.appendChild(cardBody);

    usuariosContainer.appendChild(card);
});
