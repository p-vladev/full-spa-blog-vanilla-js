import RecentUploads from "../components/RecentUploads"
import Base from "./Base.js"

const rec = new RecentUploads;

export default class {

    async render () {
        return `
            <base-render>
                <div class="home-content">
                    ${await rec.render()}
            
                    <a href="/blogs" class="white-rounded-btn">All Blogs</a>
                </div>
            </base-render>`;
    }
}