import AbstractComponent from "./AbstractComponent";

export default class extends AbstractComponent {

    async render () {
        return `
        <div class="sidebar">
            <h2>Your Blogs</h2>
            <button class="white-rounded-btn">Add Blog</button>
            <ul class="blog-list">
                <li><a href="#">First blog</a></li>
                <li><a href="#">Second blog</a></li>
                <li><a href="#">Third blog</a></li>
                <li><a href="#">Fourth blog</a></li>
            </ul>
        </div>
        `;
    }
}