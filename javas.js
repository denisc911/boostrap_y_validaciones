// Crea la vista Crear Usuario que contenga lo siguiente:
// Formulario con los siguientes campos
// Nombre
// Correo
// Contraseña
// Repite Contraseña 

document.getElementById('formulario').addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contrasena = document.getElementById('contrasena').value;
  const repiteContrasena = document.getElementById('repite-contrasena').value;

// Guarda la información recogida de cada uno de los usuarios en localStorage.
// Implementa validación que obligue a rellenar todos los campos.
// Implementa una validación para el correo.
// Implementa una validación que comprueba que la contraseña 1 es la misma que la contraseña 2.
// Implementa una validación de contraseña.

  // Validaciones
  if (nombre === '' || correo === '' || contrasena === '' || repiteContrasena === '') {
    mostrarMensaje('Todos los campos son obligatorios', 'danger');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    mostrarMensaje('Correo no válido', 'danger');
    return;
  }

  if (contrasena !== repiteContrasena) {
    mostrarMensaje('Las contraseñas no coinciden', 'danger');
    return;
  }

  if (!validarContrasena(contrasena)) {
    mostrarMensaje('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número', 'danger');
    return;
  }

  // Guarda la información recogida de cada uno de los usuarios en localStorage.
  const usuario = { nombre, correo };
  guardarUsuario(usuario);

  // Mostrar mensaje de éxito
  mostrarMensaje('Usuario creado correctamente', 'success');
  setTimeout(() => {
    window.location.href = '#seccion2';
    cargarUsuarios();
  }, 3000);
});

// validación de contraseña.

function validarContrasena(contrasena) {
  const contrasenaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return contrasenaRegex.test(contrasena);
}

function mostrarMensaje(mensaje, tipo) {
  const alerta = document.createElement('div');
  alerta.className = `alert alert-${tipo}`;
  alerta.appendChild(document.createTextNode(mensaje));
  const formulario = document.getElementById('formulario');
  formulario.parentNode.insertBefore(alerta, formulario);
  
  // Por cada validación que no se cumpla muestra un mensaje durante 3 segundos y que después desaparezca.
  // Al terminar de rellenar los datos del formulario correctamente muestra un mensaje durante 3 segundos que muestre “Usuario creado correctamente” y redirige a la vista Usuarios.
//   Por cada validación que no se cumpla muestra un mensaje durante 3 segundos y que después desaparezca.
// Al terminar de rellenar los datos del formulario correctamente muestra un mensaje durante 3 segundos que muestre “Usuario creado correctamente” y redirige a la vista Usuarios.
// Muestra los mensajes utilizando los alerts de Bootstrap.
  setTimeout(() => {
    alerta.remove();
  }, 3000);
}
// Crea la vista Usuarios la cual debe mostrar en cards de Bootstrap los usuarios guardados en localStorage con los siguientes campos:
// Nombre
// Correo


function guardarUsuario(usuario) {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  usuarios.push(usuario);
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

function cargarUsuarios() {
  const usuariosContainer = document.getElementById('usuarios-container');
  usuariosContainer.innerHTML = '';

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  usuarios.forEach(usuario => {
    const usuarioCard = document.createElement('div');
    usuarioCard.className = 'col-md-4';
    usuarioCard.innerHTML = `
      <div class="card mb-4">
        <div class="card-body">
          <h5 class="card-title">${usuario.nombre}</h5>
          <p class="card-text">${usuario.correo}</p>
        </div>
      </div>
    `;
    usuariosContainer.appendChild(usuarioCard);
  });
}

// Cargar usuarios al iniciar
document.addEventListener('DOMContentLoaded', cargarUsuarios);
