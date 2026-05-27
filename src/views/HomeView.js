import Base from "./Base.js"
import Hero from "../components/Hero.js";
import RecentUploads from "../components/RecentUploads";
import MostLiked from "../components/MostLiked";
import MostViewed from "../components/MostViewed";

const rec = new RecentUploads;
const mostLiked = new MostLiked;
const mostViewed = new MostViewed;

export default class {

    async render () {
        const hero = new Hero();
        return `
        <base-render>
            ${await hero.render()}
            <div class="home-content">
                ${await rec.render()}
                ${await mostLiked.render()}
                ${await mostViewed.render()}
            </div>
        </base-render>`;
    }
}