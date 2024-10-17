export function changeMenuBurger(e) {
    e.preventDefault();
    const burgerMenu = document.querySelector('.burger-menu');
    const contentMenu = document.querySelector('.content-menu');
    if (contentMenu.style.display === 'flex') {
        burgerMenu.style.backgroundImage = 'url(/asserts/resources/img/burger-menu.svg)';
        contentMenu.style.display = 'none';
    } else {
        burgerMenu.style.backgroundImage = 'url(/asserts/resources/img/x.svg)';
        contentMenu.style.display = 'flex';
    }

}