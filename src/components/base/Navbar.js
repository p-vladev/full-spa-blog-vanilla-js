import AbstractComponent from "../AbstractComponent"

export default class extends AbstractComponent{

    async render (isLoggedIn) {

        return `
            <nav id="navbar" class="navbar">
                <a href="/" class="logo">BlogsOnline</a>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li>${!isLoggedIn 
                        ? `<a href="/login">Log In</a>`
                        : `<a href="/profile">Profile</a>` 
                    }</li>
                </ul>
            </nav>
        `;
    }
}