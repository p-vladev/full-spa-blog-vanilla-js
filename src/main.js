import HomeView from "./views/HomeView";

const home = new HomeView;

document.querySelector('#app').innerHTML = `
  ${await home.render()}
`;