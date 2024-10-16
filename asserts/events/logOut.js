document.addEventListener('DOMContentLoaded', () =>{
    const logOut = () =>{
        localStorage.removeItem('token'); // Elimina el token
        window.location.href = './index.html'
    }
    const logOutLink = document.querySelector('#logout_link');
    if(logOutLink){
        logOutLink.addEventListener('click', logOut)
    }
})