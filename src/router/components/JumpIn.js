const sheet = new CSSStyleSheet();
const styles = 'a { color: #131313ff; text-decoration: none; font-size: 16; transition: color 0.3s; }';

sheet.replaceSync(styles);

export default class JumpIn extends HTMLElement {
    constructor () {
        super();
        const shadowRoot = this.attachShadow({mode: 'open'});

        shadowRoot.adoptedStyleSheets = [sheet];
    }

    static get observedAttributes() {
        return ['to', 'key'];
    }

    // attributeChangedCallback(name, oldValue, newValue) {
    //     if (oldValue !== newValue && name === 'props') {
    //         const obj = newValue !== null ? newValue : {};
    //         document.addEventListener("click", e => {
    //             console.log("Props: ", obj);
    //             this.render();
    //         });
    //     }
    // }

    connectedCallback () {
        this.render();
    }

    async connectedCallback () {
        this.shadowRoot.innerHTML = await this.render();
    }

    async render () {
        const to = this.getAttribute('to') || '#';
        return `
            <a href="${to}">
                <slot></slot>
            </a>
        `;
    }
}

customElements.define('jump-in', JumpIn);