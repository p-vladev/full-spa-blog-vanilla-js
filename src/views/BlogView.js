import Base from "./Base";
import Loader from "../components/Loader.js";
import BackButton from "../components/BackButton.js";

let isLoading = true;
let blog;

export default class {

    async init () {
        try {
            history.state !== undefined;
        } catch (error) {
            console.error(error)
        } finally {
            isLoading = false;
            blog = history.state;
        }
    }

    async render () {
       await this.init();

        return `
            <base-render>
            ${isLoading ? `<loader-1/>`
                : `<article class="blog-post">
                    <back-button></back-button>
                    <header class="post-header">
                        <h1 class="post-title">${blog.blogTitle}</h1>
                        <div class="post-meta">
                        <span class="post-author">Author: ${blog.user}</span>
                        <span class="post-date">Published: ${blog.postedAt}</span>
                        </div>
                    </header>

                    <section class="post-content">
                        <p>
                            ${blog.text}
                        </p>
                    </section>
                </article>`}
            </base-render>
        `;
    }
}