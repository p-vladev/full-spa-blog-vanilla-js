import { router } from "./router/Router.js";
import HomeView from "./views/HomeView";
import LogInView from "./views/LoginView.js"
import SignUpView from "./views/SignUpView.js";
import BlogView from "./views/BlogView";
import BlogsView from "./views/BlogsView.js";
import AddBlogView from "./views/AddBlogView.js";

localStorage.removeItem('currentUser');
router.RouteTo("/", new HomeView);

router.RouteTo("/login", new LogInView);
router.RouteTo("/signup", new SignUpView);

router.RouteTo("/blogs/add-blog", new AddBlogView);
router.RouteTo("/blogs", new BlogsView);
router.RouteTo("/blogs/:id", new BlogView);