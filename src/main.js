import HomeView from "./views/HomeView";
import BlogView from "./views/BlogView";
import BlogsView from "./views/BlogsView.js";
import Router from "./router/Router.js";
import AddBlogView from "./views/AddBlogView.js";

const router = new Router;

const home = new HomeView;
const blog = new BlogView;
const blogs = new BlogsView;
const addBlog = new AddBlogView;

// console.log(`Current location: ${location.pathname}`);

document.querySelector('#app').innerHTML = `${await home.render()}`;

router.RouteTo("/", home);
router.RouteTo("/blogs", blogs);
router.RouteTo("/blogs/:id", blog);
router.RouteTo("/blogs/add-blog", addBlog);