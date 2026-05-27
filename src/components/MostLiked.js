import AbstractComponent from "./AbstractComponent";
import Loader from "./Loader";
import BlogCard from "./BlogCard";
import { api } from "../services/api";

let blogsList = [];
let isLoading = true;
const blogCard = new BlogCard();

export default class extends AbstractComponent {

    BlogsRender = () => {
        let blogsHtml = ``;

        blogsList.map(blog => {
            blogsHtml += blogCard.render(blog);
        });

        return blogsHtml;
    }

    init = async () => {
        try {
            blogsList = await api.GetData("/blogs?_embed=likes&_sort=likes=desc&_limit=3");
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
            <h2>Most Liked</h2>

            <div class="uploads-list">
                ${isLoading 
                    ? `loader-1`
                    : this.BlogsRender()}
            </div>
            <a href="/blogs" class="more-btn">More...</a>
        </div>
        `;
    }
}