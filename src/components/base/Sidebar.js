import AbstractComponent from "../AbstractComponent";

export default class extends AbstractComponent {

    async render () {

        return `
        <div id="sidebar-container" class="sidebar-wrapper">
            <button id="show-btn" class="show-btn"><div class="arrow"/></button>
            <div id="sidebar" class="sidebar">
                <h2>Your Blogs</h2>
                <a href="/blogs/add-blog"><button class="white-rounded-btn">Add Blog</button></a>
                <ul class="blog-list">
                    <li><a href="/blog">First blog</a></li>
                    <li><a href="/blog">Second blog</a></li>
                    <li><a href="/blog">Third blog</a></li>
                    <li><a href="/blog">Fourth blog</a></li>
                </ul>
            </div>
        </div>
        `;
    }
}