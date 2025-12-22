import HomeView from "./views/HomeView";
import BlogView from "./views/BlogView";
import Router from "./router/router.js";

const router = new Router;

const home = new HomeView;
const blog = new BlogView;

console.log(`Current location: ${location.pathname}`);

document.querySelector('#app').innerHTML = `${await home.render()}`;

router.RouteTo("/", await home.render());
router.RouteTo("/blog", await blog.render());

console.log("Main js: ", router.routes);