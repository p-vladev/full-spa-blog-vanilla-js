import Base from "./Base";
import Loader from "../components/Loader.js";
import BackButton from "../components/BackButton.js";
import { api } from "../services/api.js";
import { router } from "../router/Router.js";

let isLoading = true;
let blog;
let user;

export default class {

    async init () {
        // if (history.state === null) return;
        try {
            blog = await api.GetData(`/blogs/${history.state}?_embed=user`);
            localStorage.getItem('currentUser') ? user = JSON.parse(localStorage.getItem('currentUser')) : user = null;
        } catch (error) {
            console.error(error)
        } finally {
            isLoading = false;
            console.log(blog);
        }
    }

    async render () {
       await this.init();

        return `
            <base-render>
            ${isLoading 
                ? `<loader-1/>`
                : `<article id="blog-post" class="blog-post">
                <back-button></back-button>
                    <header id="post-header" class="post-header" style="display: flex; flex-direction: row; gap: 40%;">
                        <div>
                            <h1 class="post-title">${blog.blogTitle}</h1>
                            <div class="post-meta">
                                <span class="post-author">Author: ${blog.user.username}</span>
                                <span class="post-date">Published: ${blog.postedAt}</span>
                            </div>
                        </div>
                    </header>

                    <section class="post-content">
                        <p>
                            ${blog.text}
                        </p>
                    </section>
                </article>`}
            </base-render>
        `;
    }

    async after_render () {
        console.log(user !== null && blog.userId === user.id);
    
        if (user !== null && blog.userId === user.id) {
            const userBtns = document.createElement("div");

            userBtns.innerHTML = `
                <a href="/blogs/${blog.id}/edit" class="white-rounded-btn">Edit</a>
                <button id="delete-btn" class="white-rounded-btn">Delete</button>
                `;
    
            console.log(userBtns);

            document.getElementById("post-header").appendChild(userBtns);
        }

        const deleteBtn = document.getElementById("delete-btn");

        deleteBtn?.addEventListener("click", async () => {
            const confirmDelete = confirm("Are you sure you want to delete this blog?");

            if (confirmDelete) {
                await api.DeleteData(`/blogs/${blog.id}`);
                alert("Blog deleted successfully!");
                router.NavigateTo("/profile");
            }
        });
    }
}