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
    }

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
    }

    UrlHandler = async (route, url, view) => {
        // console.log("Route: ", route);
        // console.log("Is :id in: ", route.match(":id"));

        if(!route.match(":id")) return;

        const routeArr = route.split("/");
        const urlArr = url.split("/");

        if (routeArr.length !== urlArr.length) return;

        const index = routeArr.findIndex((a) => a === ":id");

        if (urlArr[index] === undefined) return;

        this.NavigateTo(url, view, urlArr[index]);
    }

    ContentController = () => {
        document.addEventListener("DOMContentLoaded", () => {
            for (const route of this.routes) {
                if (route.path === location.pathname) {
                    this.Render(route.view) 

                    break;
                }

                this.UrlHandler(route.path, location.pathname, route.view);
            }
        });

        window.addEventListener("popstate", () => {
            for (const route of this.routes) {
                if (route.path === location.pathname) {
                    this.Render(route.view) 

                    break;
                }

                this.UrlHandler(route.path, location.pathname, route.view);
            }
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

            for (const route of this.routes) {
                if (link === route.path){
                    this.NavigateTo(route.path, route.view);

                    break;
                }

                this.UrlHandler(route.path, link, route.view);
            }
        });
    }
}

export const router = new Router();