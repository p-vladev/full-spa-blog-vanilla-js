import { GetProps } from "../router/props.js";

export default class Router{
    constructor () {
        this.ContentController();
        this.ClickHandler();
    }
    
    routes = [];
    
    RouteTo = (path, view) => {
        this.routes.push({
            path: path, 
            view: view
        });
    }

    Render = async (view) => {
        const renderedView = await view.render();

        // console.log("Rendered View: ", renderedView);

        document.querySelector("#app").innerHTML = renderedView;

        if (view.after_render) {
            // console.log("After Render summoned!");
            await view.after_render();
        }
    };

    NavigateTo = (path, view, props) => {

        if (props === undefined || props === null) {
            props = null;
        }

        history.pushState(props, null, path);

        this.Render(view);
    };

    UrlHandler = (route, url) => {
        const id = /\:\w+/;
        const param = "/"
        
        const routeArr = route.split(param);
        const urlArr = url.split(param);

        if (routeArr.find((a) => a === ":id")) {

            // return true;

            // console.log("Route: ", routeArr);
            // console.log("Url: ", urlArr);

            const index = routeArr.findIndex((a) => a === ":id");
            routeArr[index] = urlArr[index];

            return routeArr.join(param);
        }

        return false;
    }

    ContentController = () => {
        document.addEventListener("DOMContentLoaded", () => {
            this.routes.find(route => {
                route.path === location.pathname && this.Render(route.view);
            });
        });

        window.addEventListener("popstate", () => {
            this.routes.find(route => {
                route.path === location.pathname && this.Render(route.view);
            });
        });
    }

    ClickHandler = () => {
        document.addEventListener("click", e => {
            const aClick = e.composedPath()
                            .find(el => el instanceof HTMLAnchorElement);

            e.preventDefault();
            
            if (aClick === null || aClick === undefined) return;

            this.routes.find(route => {
                let i = this.UrlHandler(route.path, aClick.getAttribute("href"));
                
                if (aClick.getAttribute("href") === route.path){
                    this.NavigateTo(route.path, route.view);
                } else if (aClick.getAttribute("href") === i) {
                    // console.log("Props to send: ", GetProps());
                    this.NavigateTo(i, route.view, GetProps());
                }
            });
        });
    }
}