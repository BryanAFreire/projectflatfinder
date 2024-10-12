document.addEventListener('DOMContentLoaded', () => {
    userGreeting();

    const listProfile = () => {
        if (contentProfile.style.display === 'inline-block') {
            contentProfile.style.display = 'none';
        } else {
            contentProfile.style.display = 'inline-block';
        }
    }
    const profileIco = document.querySelector('.content-profile');
    const contentProfile = document.querySelector('.menu-profile');
    if (profileIco) {
        profileIco.addEventListener('click', listProfile)
    }



    dataFlat();
});