document.addEventListener('DOMContentLoaded', () => {

    userGreeting();

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

    const listProfile = (event) => {
        if (contentProfile.style.display === 'inline-block') {
            contentProfile.style.display = 'none';
        } else {
            contentProfile.style.display = 'inline-block';
        }
    }

    if (profileIco) {
        profileIco.addEventListener('click', listProfile)
    }

    const city = document.querySelector('#city');
    city.addEventListener('keyup', loadCities);

    const yearBuilt = document.querySelector('#year_built');
    yearBuilt.addEventListener('keyup', loadYears);

    const saveFlat = document.querySelector('#save-flat');
    saveFlat.addEventListener('click', createFlat);

});