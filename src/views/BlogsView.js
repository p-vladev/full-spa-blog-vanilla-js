import Base from "./Base";
import blogs from "../blogs.json"
import "../router/components/JumpIn.js";
import DefineProps from "../router/props.js";

    function BlogsRender() {
        let htmlEL = ``;

        blogs.map(blog => {
            htmlEL +=
            `<jump-in to="/blogs/${blog.id}" key="${blog.id}" class="upload-item">
                Blog ${blog.blogTitle}
                <p>Added: ${blog.postedAt}</p>
            </jump-in>
            `;
        });

        return htmlEL;
    }

    document.addEventListener("click", e => {
        const jumps = document.querySelectorAll("jump-in");
        const link = e.target.getAttribute("to");

        if (jumps === null) return;

        jumps.forEach(i => {
            const key = i.getAttribute("key");

            if (link === null) return;
            if (link.includes(`/blogs/${key}`) === false) return;

            const blog = blogs.find(b => b.id == key);

            // console.log("Key: ", i);
            // console.log("Blog: ", blog);

            DefineProps(blog);
        })
    });

export default class {

    async render () {
        return `
            <base-render>
                <div class="recent-uploads">
                    <h2>Blogs</h2>

                    <div class="uploads-list">
                        ${BlogsRender()}
                    </div>
                </div>
            </base-render>
        `;
    }
}