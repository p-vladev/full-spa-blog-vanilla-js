export default class Router{
    constructor () {
        this.ClickHandler();
    }
    
    routes = [];
    
    RouteTo = (path, view) => {
        this.routes.push({
            path: path, 
            view: view
        });
    }

    Render = (view) => document.querySelector("#app").innerHTML = view;

    NavigateTo = (path, view) => {
        history.pushState(null, null, path);
        this.Render(view);
    };

    ClickHandler = () => {
        document.addEventListener("click", e => {
            const aClick = e.composedPath()
                            .find(el => el instanceof HTMLAnchorElement);

            e.preventDefault();
            
            if (aClick === null || aClick === undefined) return;

            this.routes.forEach(route => {
                if (aClick.getAttribute("href") === route.path){
                    this.NavigateTo(route.path, route.view);
                }
            });
        });
    }
}