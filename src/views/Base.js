import Navbar from "../components/base/Navbar";
import Sidebar from "../components/base/Sidebar";
import sheetCSS from "../style.css?inline";

const nav = new Navbar;
const sidebar = new Sidebar;

const styles = new CSSStyleSheet();
styles.replaceSync(sheetCSS);

const ShowAndHideHandler = (sideNav, nav) => {
    const showBtn = sideNav.querySelector("#show-btn");
    const side = sideNav.querySelector("#sidebar");

    sideNav.addEventListener("click", e => {
        if (e.target === showBtn) {
            side.classList.add("is-open");
            sideNav.classList.add("active")
            showBtn.classList.add("hidden");
            nav.classList.add("is-clossed")

            return;
        } 
        
        if (e.target !== side && !side.contains(e.target)) {
            side.classList.remove("is-open");
            sideNav.classList.remove("active")
            showBtn.classList.remove("hidden");
            nav.classList.remove("is-clossed")
        }
    });
}

export default class Base extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    
    async connectedCallback () {
        this.shadowRoot.innerHTML = await this.render();
        this.shadowRoot.adoptedStyleSheets = [styles];

        const sidebarContainer = this.shadowRoot.getElementById("sidebar-container");
        const navbar = this.shadowRoot.getElementById("navbar");

        ShowAndHideHandler(sidebarContainer, navbar);
    }

    async render () {
        return `
            ${nav.render()}
            ${await sidebar.render()}
            <div class="container">
                <slot></slot>
            </div>
            `
    }
}

customElements.define('base-render', Base);