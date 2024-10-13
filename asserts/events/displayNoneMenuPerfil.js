const burgerMenu = document.querySelector('.burger-menu');
const contentMenu = document.querySelector('.content-menu');
const profileIco = document.querySelector('.content-profile');
const contentProfile = document.querySelector('.menu-profile');


document.addEventListener('click', (event) => {
    if (!burgerMenu.contains(event.target) && !contentMenu.contains(event.target)) {
        contentMenu.style.display = 'none';
        burgerMenu.style.backgroundImage = 'url(/asserts/resources/img/burger-menu.svg)';
    }

    if (!profileIco.contains(event.target) && !contentProfile.contains(event.target)) {
        contentProfile.style.display = 'none';
    }
});