const app = document.getElementById('app');

const routes = {
    home: "<h2>Home</h2><p>Welcome to the home page.</p>",
    about: "<h2>About</h2><p>This is the about page.</p>",
    contact: "<h2>Contact</h2><p>Contact us here.</p>"
};

function route() {
    let hash = window.location.hash.substring(1);
    
    if (!hash || !routes[hash]) {
        hash = 'home';
    }
    
    app.innerHTML = routes[hash];
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);
