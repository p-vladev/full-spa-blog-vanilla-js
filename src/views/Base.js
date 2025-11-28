import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import sheetCSS from "../style.css?inline";

const nav = new Navbar;
const sidebar = new Sidebar;

const styles = new CSSStyleSheet();
styles.replaceSync(sheetCSS);

export default class Base extends HTMLElement {

    constructor () {
        super();
        this.attachShadow({mode: 'open'});
    }
    
    async connectedCallback () {
        this.shadowRoot.innerHTML = await this.render();
        this.shadowRoot.adoptedStyleSheets = [styles];
    }

    async render () {
        return `
            ${nav.render()}
            <div class="container">
                ${await sidebar.render()}
                <slot></slot>
            </div>
            
            `
    }
}

customElements.define('base-render', Base);