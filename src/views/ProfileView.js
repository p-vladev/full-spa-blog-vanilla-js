import Base from "./Base";
import { api } from "../services/api";
import { router } from "../router/Router";

let isLoading = true;

export default class {

    BlogsRender = async (user) => {
        let blogsHtml = ``;
        let blogsList = await api.GetData(`/blogs?userId=${user.id}`);
        
        // console.log("Blog list: ", blogsList);

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

    async render () {
        const user = JSON.parse(localStorage.getItem('currentUser'));

        return `
            <base-render>
                <div class="profile-card">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            ${user.username.charAt(0).toUpperCase()}
                        </div>
                        <h2 class="profile-username">@${user.username}</h2>
                        <span class="profile-role">User</span>
                    </div>

                    <div class="profile-body">
                        <div class="profile-row">
                            <div class="profile-field">
                                <label>First Name</label>
                                <div class="value">${user.firstName}</div>
                            </div>
                            <div class="profile-field">
                                <label>Second Name</label>
                                <div class="value">${user.secondName}</div>
                            </div>
                        </div>

                        <div class="profile-field full-width">
                            <label>Email Address</label>
                            <div class="value email">${user.email}</div>

                            <button id="exit-btn" class="white-rounded-btn" style="margin: 8px;">EXIT</button>
                        </div>

                        <div class="profile-section">
                            <h3 class="section-title">Blogs</h3>
                            <div class="blogs-list">
                                ${await this.BlogsRender(user)}
                            </div>
                        </div>
                    </div>
                </div>
            </base-render>
        `;
    }

    async after_render () {
        document.getElementById("exit-btn").addEventListener("click", e => {
            e.preventDefault();
            localStorage.removeItem('currentUser');

            router.NavigateTo("/");
        })
    }
}