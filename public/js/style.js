var header = document.getElementById('header');
var messages = document.getElementById('messages');



window.onscroll = function() {
    if (window.pageYOffset > header.offsetTop) {
        header.classList.add("sticky");
        messages.style.paddingTop = header.offsetHeight + 'px';
    } else {
        header.classList.remove('sticky');
        messages.style.paddingTop = null; // remove
    }
}

//theme
let offsetY, offsetX;
let themeMoving = false;
themeContainerTop.addEventListener('mousedown', e => {
    if (!themeMoving) {
        offsetY = themeContainer.getBoundingClientRect().y - e.clientY;
        offsetX = themeContainer.getBoundingClientRect().x - e.clientX;
        window.addEventListener('mousemove', themeMove, true);
        themeMoving = true;
    } else {
        window.removeEventListener('mousemove', themeMove, true);
        themeMoving = false
    }
})

function themeMove(e) {
    themeContainer.style.top = (e.clientY + offsetY) + 'px';
    themeContainer.style.left = (e.clientX + offsetX) + 'px';
}