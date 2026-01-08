
const TextFormatter = (type) => {
    if (type === null || type === undefined) return;

    document.execCommand(type, false, null);
}

export default class {

    async render() {
        return `
            <div id="blog-editor" class="blog-editor">
                <header class="blog-editor-header">
                    <input id="blog-title" class="blog-title" type="text" placeholder="Blog Title"/>
                    <button id="post-btn" class="white-rounded-btn">Post</button>
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

    
    async after_render () {
        const postBtn = document.getElementById("post-btn");
        const boldBtn = document.getElementById("bold-btn");
        const italicBtn = document.getElementById("italic-btn");
        const underlineBtn = document.getElementById("underline-btn");
        
        // console.log("START");

        boldBtn.addEventListener("click", e => {
            TextFormatter("bold");
        });

        italicBtn.addEventListener("click", e => {
            TextFormatter("italic");
        });

        underlineBtn.addEventListener("click", e => {
            TextFormatter("underline");
        });

        postBtn.addEventListener("click", e => {
            e.preventDefault();

            const blogTitle = document.getElementById("blog-title").value;
            const blogContent = document.getElementById("blog-content").innerHTML;

            if (blogTitle === "" || blogContent === "") return;

            const id = Math.floor(Math.random() * 1000000);

            const d = new Date();
            const month = d.getMonth() + 1;
            const day = d.getDate();
            const year = d.getFullYear();

            const postedAt = `${day}-${month}-${year}`;

            const blog = {
                "id": id,
                "blogTitle": blogTitle,
                "user": "Anonymous",
                "postedAt": postedAt,
                "text": blogContent
            };

            // console.log("Blog to be added: ", blog);

            fetch("http://localhost:3000/blogs", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(blog)
            }).then(response => response.json());
            alert("Blog posted successfully!");
        });
    }
}