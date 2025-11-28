import AbstractComponent from "./AbstractComponent"

export default class extends AbstractComponent{

    render () {
        return `
        <nav class="navbar">
            <div class="logo">BlogsOnline</div>
            <ul class="nav-links">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Smt1</a></li>
                <li><a href="#">Smt2</a></li>
            </ul>
        </nav>
        `;
    }
}