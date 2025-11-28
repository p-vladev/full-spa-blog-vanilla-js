import RecentUploads from "../components/RecentUploads"
import Base from "./Base.js"

const rec = new RecentUploads;

export default class {

    async render () {
        return `<base-render>${await rec.render()}</base-render>`;
    }
}