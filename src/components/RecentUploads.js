import AbstractComponent from "./AbstractComponent";

export default class extends AbstractComponent {

    async render () {
        return `
        <div class="recent-uploads">
            <h2>Recent Uploads</h2>

            <div class="uploads-list">
                <div class="upload-item">
                    <h3>Blog 1</h3>
                    <p>Added: 10 min ago</p>
                </div>

                <div class="upload-item">
                    <h3>Blog 2</h3>
                    <p>Added: 2 hours ago</p>
                </div>

                <div class="upload-item">
                    <h3>Blog 3</h3>
                    <p>Added: Yesterday</p>
                </div>
            </div>
        </div>
        `;
    }
}