import Base from "./Base";

export default class {

    async render () {
        return `
            <base-render>
                <article class="blog-post">
                    <header class="post-header">
                        <h1 class="post-title">Заголовок статті</h1>
                        <div class="post-meta">
                        <span class="post-author">Author: Tets</span>
                        <span class="post-date">Published: 15 dec. 2025</span>
                        </div>
                    </header>

                    <section class="post-content">
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur, repellendus esse ut obcaecati nostrum odio. Nihil, deserunt consequuntur! Culpa corporis placeat quis fugit, reprehenderit ex sunt magni ullam numquam?
                        </p>

                        <p>
                            Etc.
                        </p>
                    </section>
                </article>
            </base-render>
        `;
    }
}