import { api } from "../services/api.js";

class Router {
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
        if (props === undefined) props = null;
        if (view === null || view === undefined) {
            this.routes.find(route => {
                if (route.path === path) {
                    view = route.view;

                    return true;
                }
            });
        }

        history.pushState(props, null, path);

        this.Render(view);
    };

    UrlHandler = async (route, url, view) => {
        const param = "/"
        
        const routeArr = route.split(param);
        const urlArr = url.split(param);

        if (routeArr.find((a) => a === ":id") === undefined) return;

        const index = routeArr.findIndex((a) => a === ":id");

        if (urlArr[index] === undefined) return;

        this.NavigateTo(url, view, await api.GetDataById(`/${urlArr[index - 1]}`, urlArr[index]))   
    }

    ContentController = () => {
        document.addEventListener("DOMContentLoaded", () => {
            this.routes.find(route => {
                route.path === location.pathname 
                    ? this.Render(route.view) 
                    : this.UrlHandler(route.path, location.pathname, route.view);
            });

            // for (const route of this.routes) {
            //     if (route.path === location.pathname) {
            //         this.Render(route.view) 

            //         break;
            //     }

            //     this.UrlHandler(route.path, location.pathname, route.view);
            // }
        });

        window.addEventListener("popstate", () => {
            this.routes.find(route => {
                route.path === location.pathname && this.Render(route.view);
            });
        });
    }

    ClickHandler = () => {
        document.addEventListener("click", e => {
            const aTags = e.composedPath()
                .find(el => el instanceof HTMLAnchorElement);
            
            if (aTags === undefined || aTags === null) return;
            
            e.preventDefault();

            const link = aTags.getAttribute("href");
    
            if (link === null || link === location.pathname) return;

            this.routes.find(route => { 
                if (link === route.path){
                    this.NavigateTo(route.path, route.view);

                    return true;
                }

                this.UrlHandler(route.path, link, route.view);
            });

            // for (const route of this.routes) {
            //     if (link === route.path){
            //         this.NavigateTo(route.path, route.view);

            //         break;
            //     }

            //     this.UrlHandler(route.path, link, route.view);
            // }
        });
    }
}

export const router = new Router();