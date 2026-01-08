
const loaderStyles = `
@keyframes TopLineLoader {
    0% {width: 10px; height: 40px;}
    50% {width: 30px; height: 10px;}
    100% {width: 10px; height: 40px;}
}

@keyframes BottomLineLoader {
    0% {width: 30px; height: 10px;}
    50% {width: 10px; height: 40px;}
    100% {width: 30px; height: 10px;}
}

.loader{
    display: flex;
    margin: auto;
}

.top-line{
    background-color: #2c3e50;
    width: 10px;
    height: 40px;
    animation-name: TopLineLoader;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}

.bottom-line{
    background-color: #2c3e50;
    width: 40px;
    height: 10px;
    animation-name: BottomLineLoader;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}`;

const styles = new CSSStyleSheet();
styles.replaceSync(loaderStyles);

export default class Loader extends HTMLElement{

    constructor () {
        super();
        this.attachShadow({mode: "open"});
        console.log("Start")
    }

    async connectedCallback () {
        this.shadowRoot.innerHTML = await this.render();
        this.shadowRoot.adoptedStyleSheets = [styles];
    }

    async render () {
        return `<div class="loader">
                    <div class="top-line"></div>
                    <div class="bottom-line"></div>
                </div>`;
    };
}

customElements.define("loader-1", Loader);