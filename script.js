const welcomeMessage = document.getElementById('welcomeMessage');
const visitorNameInput = document.getElementById('visitorName');
const submitButton = document.getElementById('submitButton');

function getCookie(name) {
  const value = `; `;  // add semicolon and space for better parsing
  const parts = document.cookie.split(value + name + '=');
  if (parts.length === 2) return parts.pop().split(';')[0];
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

function greetVisitor() {
  const visitorName = getCookie('visitorName');
  let message = 'Welcome! ';
  if (visitorName) {
    message += 'Nice to see you again, ' + visitorName + '. ';
    const lastVisit = getCookie('lastVisit');
    if (lastVisit) {
      message += 'Your last visit was on ' + lastVisit + '.';
    }
  } else {
    message += 'Please enter your name below:';
  }
  welcomeMessage.textContent = message;
}

function setLastVisit() {
  const date = new Date();
  setCookie('lastVisit', date.toUTCString(), 1); // Set cookie to expire in 1 day
}

greetVisitor();

submitButton.addEventListener('click', function() {
  const name = visitorNameInput.value;
  if (name) {
    setCookie('visitorName', name, 30); // Set cookie to expire in 30 days
    setLastVisit();
    greetVisitor();
    visitorNameInput.value = ''; // Clear input field
  }
});