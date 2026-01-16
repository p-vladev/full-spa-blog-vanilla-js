import AbstractComponent from "./AbstractComponent";
import Loader from "./Loader";
import { api } from "../services/api";

let blogsList = [];
let isLoading = true;

export default class extends AbstractComponent {

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
            blogsList = await api.GetDataSortedByDate("desc", 3);
        } catch (error) {
            console.error("Error fetching blogs: ", error);
        } finally {
            isLoading = false;
        }
    }


    async render () {
        await this.init();

        return `
        <div class="recent-uploads">
            <h2>Recent Uploads</h2>

            <div class="uploads-list">
                ${isLoading 
                    ? `loader-1`
                    : this.BlogsRender()}
            </div>
        </div>
        `;
    }
}