export default class {

    render (blog) {
        return `<a href="/blogs/${blog.id}" class="upload-item">
                    <h3>${blog.blogTitle}</h3>
                    <P>Author: ${blog.username}</P>
                    <p>Added: ${blog.postedAt}</p>
                    <p>Likes: ${blog.likes ? blog.likes.length : 0}</p>
                    <p>Views: ${blog.views ? blog.views.length : 0}</p>
                </a>`;
    } 
}