import Base from "./Base";
import Loader from "../components/Loader";
import BlogEditor from "../components/BlogEditor";
import { api } from "../services/api";

let isLoading = false;

export default class {
    constructor () {
        this.blogEditor = new BlogEditor;
    }

    EditBlog (blogTitle, blogContent) {
        api.PatchData(`/blogs/${history.state}`,
            {
                blogTitle: blogTitle,
                text: blogContent
            });

        alert("Blog edited successfully!");
    }

    async init () {
        try {
            document.getElementById("add-blog-form");
            this.blog = await api.GetData(`/blogs/${history.state}?_embed=user`);
        } catch (error) {
            console.error("Error getting element: ", error);
        } finally {
            isLoading = false;
        }
    }

    async render () {
        console.log(history.state);
        await this.init();

        return `
            <base-render>
                ${isLoading 
                    ? `<loader-1/>`
                    : await this.blogEditor.render()}
            </base-render>
        `;
    }

    async after_render () {
        await this.blogEditor.after_render(this.EditBlog, this.blog);
    }
}