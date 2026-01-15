import Base from "./Base";
import Loader from "../components/Loader.js";
import BackButton from "../components/BackButton.js";
import "../router/components/JumpIn.js";
import DefineProps from "../router/props.js";

let blogsList = [];
let isLoading = true;

document.addEventListener("click", e => {
    const jumps = document.querySelectorAll("jump-in");
    const link = e.target.getAttribute("to");

    if (jumps === null) return;

    jumps.forEach(i => {
        const key = i.getAttribute("key");

        if (link === null) return;
        if (link.includes(`/blogs/${key}`) === false) return;

        const blog = blogsList.find(b => b.id == key);

        // console.log("Key: ", i);
        // console.log("Blog: ", blog);

        DefineProps(blog);
    })
});

export default class {
    
    Fetcher = async () => fetch("http://localhost:3000/blogs")
            .then(response => response.json())
            .then(blogs => {
                console.log("Fetched blogs: ", blogs);
                if (blogsList[0] !== null || blogsList[0] !== undefined) blogsList = [];
                blogs.map(blog => blogsList.push(blog));
            });

    BlogsRender = () => {
        let blogsHtml = ``;

        blogsList.map(blog => {
            blogsHtml += `
                <jump-in to="/blogs/${blog.id}" key="${blog.id}" class="upload-item">
                    ${blog.blogTitle}
                    <p>Added: ${blog.postedAt}</p>
                </jump-in>
            `;
        });

        console.log("Is Loading: ", isLoading);
        return blogsHtml;
    }

    init = async () => {
        try {
            await this.Fetcher();
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