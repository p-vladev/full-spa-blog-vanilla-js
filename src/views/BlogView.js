import Base from "./Base";
import {GetProps} from "../router/props.js";

export default class {

    async render () {
        if (history.state === null) return;
        // console.log("Blog props in BlogView: ", GetProps());
        let blog = {
                        "id": 0,
                        "blogTitle": "",
                        "user": "",
                        "postedAt": "",
                        "text": ""
                    };


        blog = history.state;

        // console.log("Blog props: ", blog);

        return `
            <base-render>
                <article class="blog-post">
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
                </article>
            </base-render>
        `;
    }
}