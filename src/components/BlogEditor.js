import { api } from "../services/api";

const TextFormatter = (type) => {
    if (type === null || type === undefined) return;

    document.execCommand(type, false, null);
}

export default class {

    // async init () {
    //     try {
    //         this.blogId = history.state;
    //         this.blog = await api.GetData(`/blogs/${this.blogId}?_embed=user`);
    //         console.log(this.blog);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    async render() {
        // this.blogId && console.log("Blog id: ", this.blogId);
        // await this.init();

        return `
            <div id="blog-editor" class="blog-editor" style="max-width: 75%;">
                <header id="blog-editor-header" class="blog-editor-header">
                    <input id="blog-title" class="blog-title" type="text" placeholder="Blog Title"/>
                    <!-- <button id="post-btn" class="white-rounded-btn">Post</button> -->
                    <!-- ${this.blogId && `<button id="delete-btn" class="white-rounded-btn">Delete</button>`} -->
                </header>
                <div class="formatting-toolbar">
                    <div id="bold-btn" class="format-btn bold-btn">B</div>
                    <div id="italic-btn" class="format-btn italic-btn">I</div>
                    <div id="underline-btn" class="format-btn underline-btn">A</div>
                </div>
                <div id="blog-content" class="blog-content" contenteditable="true">
                
                </div>
            </div>
        `;
    }

    
    async after_render (methodFunction, blog) {
        const submitBtn = `<button id="submit-btn" class="white-rounded-btn">${blog ? "Edit" : "Post"}</button>`;
        const deleteBtn = blog ? `<button id="delete-btn" class="white-rounded-btn">Delete</button>` : ``;
        const blogEditorHeader = document.getElementById("blog-editor-header");

        const btns = document.createElement("div");
        btns.innerHTML = `${submitBtn} ${deleteBtn}`;

        blogEditorHeader.appendChild(btns);

        if (blog) {
            document.getElementById("blog-title").value = blog.blogTitle;
            document.getElementById("blog-content").innerHTML = blog.text;
        }

        document.getElementById("delete-btn")?.addEventListener("click", async () => {
            const confirmDelete = confirm("Are you sure you want to delete this blog?");
            
            if (confirmDelete) {
                await api.DeleteData(`/blogs/${blog.id}`);
                alert("Blog deleted successfully!");
                router.NavigateTo("/profile");
            }
        });

        document.getElementById("bold-btn").addEventListener("click", e => {
            TextFormatter("bold");
        });

        document.getElementById("italic-btn").addEventListener("click", e => {
            TextFormatter("italic");
        });

        document.getElementById("underline-btn").addEventListener("click", e => {
            TextFormatter("underline");
        });

        document.getElementById("submit-btn").addEventListener("click", e => {
            e.preventDefault();

            const blogTitle = document.getElementById("blog-title").value;
            const blogContent = document.getElementById("blog-content").innerHTML;

            if (blogTitle === "" || blogContent === "") return;

            methodFunction(blogTitle, blogContent);
        });
    }
}