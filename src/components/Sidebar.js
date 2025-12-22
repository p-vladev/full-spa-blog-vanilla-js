import AbstractComponent from "./AbstractComponent";

export default class extends AbstractComponent {

    async render () {
        return `
        <div class="sidebar">
            <h2>Your Blogs</h2>
            <button class="white-rounded-btn">Add Blog</button>
            <ul class="blog-list">
                <li><a href="/blog" data-link>First blog</a></li>
                <li><a href="/blog" data-link>Second blog</a></li>
                <li><a href="/blog" data-link>Third blog</a></li>
                <li><a href="/blog" data-link>Fourth blog</a></li>
            </ul>
        </div>
        `;
    }
}