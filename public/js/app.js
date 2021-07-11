var socket = io();
const room = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
})
console.log(room.room)
const head = document.getElementsByTagName('head')[0];

//messages and form
var messages = document.getElementById('messages');
const charForm = document.getElementById('form');
var input = document.getElementById('input');
var header = document.getElementById('header');

//header variables
var username = document.getElementById('username');
var roomElement = document.getElementById('room');
const themeButton = document.getElementById('themeButton');
let userId = username.value;
let roomId = roomElement.value;

//theme variables
const themeContainer = document.getElementById('themeContainer');
const themeContainerTop = document.getElementById('themeContainerTop');
const closeThemeContainer = document.getElementById('closeThemeContainer');
const themeWhiteButton = document.getElementById('themeWhiteButton');
const themeDarkButton = document.getElementById('themeDarkButton');
const themeRainbowButton = document.getElementById('themeRainbowButton');
let themeLink;

//start
username.value = localStorage.getItem('username');
if (room.room == undefined) location.replace('/');
else {
    roomElement.value = room.room;
    localStorage.setItem('room', room.room);
}
if (localStorage.getItem('theme') == undefined) localStorage.setItem('theme', 'white');
changesTheme();
userId = username.value;
roomId = roomElement.value;

socket.emit('newConnect', userId, roomId);


//get messages
socket.on('message' + roomId, (message, classes) => {
    var scrollButtom = (window.innerHeight + window.scrollY + 5) >= document.body.offsetHeight;
    console.log(message)
    document.getElementById('messages').innerHTML += '<li class="message ' + classes + '">' + message + '</li>';

    if (scrollButtom) window.scrollTo(0, document.body.scrollHeight);
})

//send chat
charForm.addEventListener('submit', e => {
    e.preventDefault();
    msg = input.value;
    userId = username.value;
    socket.emit('chatMessage', msg, userId, roomId);
    console.log(roomId);
    input.value = '';
});


//change username
username.addEventListener('change', e => {
    newUserId = username.value
    oldUserId = localStorage.getItem('username');
    localStorage.setItem('username', newUserId);

    socket.emit('changeUsername', newUserId, oldUserId, roomId);
})

//change room
roomElement.addEventListener('change', e => {
    localStorage.setItem('room', roomElement.value);
    location.replace('?room=' + roomElement.value);
})


//theme
themeButton.addEventListener('click', e => {
    if (themeContainer.style.display == 'none') themeContainer.style.display = 'block';
    else themeContainer.style.display = 'none';
})
closeThemeContainer.addEventListener('click', e => {
    window.removeEventListener('mousemove', themeMove, true);
    themeMoving = false;
    themeContainer.style.display = 'none';
})
themeWhiteButton.addEventListener('click', e => {
    localStorage.setItem('theme', 'white');
    changesTheme();
})
themeDarkButton.addEventListener('click', e => {
    localStorage.setItem('theme', 'dark');
    changesTheme();
})
themeRainbowButton.addEventListener('click', e => {
    localStorage.setItem('theme', 'rainbow');
    changesTheme();
})

function changesTheme(theme) {
    if (theme == null) theme = localStorage.getItem('theme');
    if (themeLink != undefined) themeLink.remove();
    themeLink = document.createElement('link');
    themeLink.href = '/css/themes/' + theme + '.css';
    themeLink.type = 'text/css';
    themeLink.rel = 'stylesheet';

    head.appendChild(themeLink);
}