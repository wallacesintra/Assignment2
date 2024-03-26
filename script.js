const welcomeMessage = document.getElementById('welcomeMessage');
const visitorNameInput = document.getElementById('Name');
const submitButton = document.getElementById('submitButton');

let username

function greet() {
    username = prompt("What is your name?");
    alert("Hello " + username + "! Welcome to my website!");
    console.log("Hello " + username + "! Welcome to my website!");
    storeUsernameInCookie(username);
}


function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) == 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

function storeUsernameInCookie(username) {
    const date = new Date();
    const expires = new Date(date.getTime() + (30 * 24 * 60 * 60 * 1000)); // Set cookie to expire in 30 days
    document.cookie = `visitorName=${username}; expires=${expires.toUTCString()}; SameSite=None; Secure; path=/`;
    document.cookie = `lastVisit=${date.toUTCString()}; expires=${expires.toUTCString()}; SameSite=None; Secure; path=/`;
}

function checkVisitorName() {
    const visitorName = getCookie('visitorName');

    let message = ``;
    if (visitorName !== null && visitorName !== undefined && visitorName !== '') {
        message += `<p> Hi there! Good to see you again, ${visitorName} </p>`;
        const lastVisit = getCookie('lastVisit');
        if (lastVisit) {
            const currentDate = new Date();
            const expires = new Date(currentDate.getTime() + (30 * 24 * 60 * 60 * 1000)); // Set cookie to expire in 30 days
            document.cookie = `lastVisit=${currentDate.toUTCString()}; expires=${expires.toUTCString()}; SameSite=None; Secure; path=/`;
            message += `<p> Your last visit was on ${currentDate}. </p>`;
        }
        console.log(message);
        welcomeMessage.innerHTML = message;
    }
    else {
        greet()
    }
}

checkVisitorName();
