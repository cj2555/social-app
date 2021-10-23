import routes from "routes";
import { componentRoutes } from 'routes';


//merge routes and componentRoutes arrays
const allRoutes = [...routes, ...componentRoutes];



export const useRouteName = () => {
  let name = "";
  allRoutes.forEach((route) => {
    if (window.location.href.indexOf(route.layout + route.path) !== -1) {
      name = routes.rtlActive ? route.rtlName : route.name;
    }
  });
  return name;
};
