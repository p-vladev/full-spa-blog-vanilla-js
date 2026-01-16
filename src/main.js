import HomeView from "./views/HomeView";
import BlogView from "./views/BlogView";
import BlogsView from "./views/BlogsView.js";
import Router from "./router/Router.js";
import AddBlogView from "./views/AddBlogView.js";

const router = new Router;

router.RouteTo("/", new HomeView);
router.RouteTo("/blogs", new BlogsView);
router.RouteTo("/blogs/:id", new BlogView);
router.RouteTo("/blogs/add-blog", new AddBlogView);