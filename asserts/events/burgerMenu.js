document.addEventListener('DOMContentLoaded', () => {
    const listMenu = () => {
        if (contentMenu.style.display === 'flex') {
            burgerMenu.style.backgroundImage = 'url(/asserts/resources/img/burger-menu.svg)';
            contentMenu.style.display = 'none';
        } else {
            burgerMenu.style.backgroundImage = 'url(/asserts/resources/img/x.svg)';
            contentMenu.style.display = 'flex';
        }

    }
    const burgerMenu = document.querySelector('.burger-menu');
    const contentMenu = document.querySelector('.content-menu');
    if (burgerMenu) {
        burgerMenu.addEventListener('click', listMenu)
    }
})