import Base from "./Base";
import Loader from "../components/Loader";
import BlogEditor from "../components/BlogEditor";

// const blogEditor = new BlogEditor;
let isLoading = true;

const ElementGetter = async () => document.getElementById("add-blog-form")

const init = async () => {
    try {
        await ElementGetter()
    } catch (error) {
        console.error("Error getting element: ", error);
    } finally {
        isLoading = false;
    }
}

export default class {
    constructor () {
        this.blogEditor = new BlogEditor;

    }

    async render () {
        await init()
        
        // console.log("Is loading: ", isLoading);

        return `
            <base-render>
                ${isLoading 
                    ? `<loader-1/>`
                    : await this.blogEditor.render()}
            </base-render>
        `;
    }

    async after_render () {
        await this.blogEditor.after_render();
    }
}