const listProfile = () => {
    const contentProfile = document.querySelector('.menu-profile');
    if (contentProfile.style.display === 'inline-block') {
        contentProfile.style.display = 'none';
    } else {
        contentProfile.style.display = 'inline-block';
    }
}; export {listProfile};