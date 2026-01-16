import Base from "./Base";
import Loader from "../components/Loader.js";
import BackButton from "../components/BackButton.js";
import { api } from "../services/api.js";

let blogsList = [];
let isLoading = true;

export default class {

    BlogsRender = () => {
        let blogsHtml = ``;

        blogsList.map(blog => {
            blogsHtml += `
                <a href="/blogs/${blog.id}" class="upload-item">
                    <h3>${blog.blogTitle}</h3>
                    <p>Added: ${blog.postedAt}</p>
                </a>
            `;
        });

        return blogsHtml;
    }

    init = async () => {
        try {
            blogsList = await api.GetData();
        } catch (error) {
            console.error("Error fetching blogs: ", error);
        } finally {
            isLoading = false;
        }
    }

    async render () {
        await this.init();
        return `
            <base-render>
                <div class="recent-uploads">
                    <h2>Blogs</h2>
                    <back-button></back-button>

                    <div class="uploads-list">
                        ${isLoading ? `<loader-1/>` 
                                    : this.BlogsRender()}
                    </div>
                </div>
            </base-render>
        `;
    }
}