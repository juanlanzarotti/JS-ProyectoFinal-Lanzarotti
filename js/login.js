const loginButton = document.getElementById('loginButton');
const loggedInMessage = document.getElementById('loggedInMessage');
const logoutButton = document.getElementById('logoutButton');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const messageContainer = document.getElementById('messageContainer');
const users = [
  { username: 'juan', password: '1234' },
  { username: 'iara', password: '1111' },
  { username: 'daniel', password: '1234' },
  { username: 'carlos', password: '5000' },
  { username: 'nicolas', password: 'coder123' },
  { username: 'esteban', password: 'hola' }
];

// Función para mostrar mensajes en el DOM
function showMessage(message, type) {
  messageContainer.style.display = 'block';
  messageContainer.className = `alert alert-${type}`;
  messageContainer.textContent = message;

  setTimeout(() => {
    messageContainer.style.display = 'none';
  }, 3000);
}

// chequeo si el usuario esta logueado
function checkLoggedInUser() {
  const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
  if (storedUser) {
    loggedInMessage.innerText = `Hola, ${storedUser.username} (Logueado)`;
    loggedInMessage.style.display = 'block';
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';
  } else {
    loggedInMessage.style.display = 'none';
    loginButton.style.display = 'block';
    logoutButton.style.display = 'none';
  }
}

// verifico si el usuario esta logueado cuando se carga la pagina
document.addEventListener('DOMContentLoaded', () => {
  checkLoggedInUser();
});

// Verifico el estado de inicio de sesion en cada cambio de URL
window.addEventListener('popstate', () => {
  checkLoggedInUser();
});

// Manejar el inicio de sesion
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const enteredUsername = usernameInput.value;
  const enteredPassword = passwordInput.value;

  const user = users.find(u => u.username === enteredUsername && u.password === enteredPassword);

  if (user) {
    showMessage(`Hola, ${user.username} (Logueado)`, 'success');
    loginButton.style.display = 'none';
    logoutButton.style.display = 'block';

    // Almacenar el usuario en JSON
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    $('#loginModal').modal('hide');
  } else {
    showMessage('Credenciales incorrectas. Intente nuevamente.', 'danger');
  }
});

// Manejar el cierre de sesion (deslogueo)
function logout() {
  // Remover el usuario almacenado al cerrar sesion
  localStorage.removeItem('loggedInUser');

  showMessage('Sesión cerrada exitosamente', 'success');
  loginButton.style.display = 'block';
  logoutButton.style.display = 'none';
}

logoutButton.addEventListener('click', logout);