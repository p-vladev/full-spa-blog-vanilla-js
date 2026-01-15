
const BackButtonStyles = `
.white-rounded-btn {
    background-color: #ffffff;
    color: #000;
    border: 1px solid #ccc;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.2s;
    margin-bottom: 12px;
}

.white-rounded-btn:hover {
    background-color: #f2f2f2;
}
`;

const styles = new CSSStyleSheet();
styles.replaceSync(BackButtonStyles);

export default class BackButton extends HTMLElement {
    constructor () {
       super();
       this.attachShadow({mode: "open"});
    }

    connectedCallback () {
        this.shadowRoot.innerHTML = this.render();
        this.shadowRoot.adoptedStyleSheets = [styles];

        this.btn = this.shadowRoot.getElementById("back-button");

        this.btn.addEventListener("click", () => history.back());
    }

    disconnectedCallback() {
        this.btn.removeEventListener("click", () => history.back());
    }

    render () {
        return `
            <button id="back-button" class="white-rounded-btn">Back</button>
        `;
    }
} 

customElements.define("back-button", BackButton);