import AbstractComponent from "../AbstractComponent"

let isLoggedIn = false;

export default class extends AbstractComponent{

    async init () {
        let userData;

        try {
            userData = localStorage.getItem('currentUser');
            console.log(userData);
        } catch (error) {
            console.error(error);
        } finally {
            if(userData) isLoggedIn = true;
        }
    }

    async render () {
        await this.init();

        return `
            <nav id="navbar" class="navbar">
                <a href="/" class="logo">BlogsOnline</a>
                <ul class="nav-links">
                    <li><a href="/">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li>${!isLoggedIn 
                        ? `<a href="/login">Log In</a>`
                        : `<a href="/">Profile</a>` 
                    }</li>
                </ul>
            </nav>
            `;
    }
}