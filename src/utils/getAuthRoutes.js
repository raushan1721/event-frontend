import { Route,Navigate } from "react-router-dom";

const token = window.localStorage.getItem("isLoggedIn");
const getAuthRoutes = (routes) => {

  return routes.map(
    ({ component: Component, layout: Layout, ...rest }, key) => {
      return (
        <Route {...rest} element={ (!token)?<Layout component={ Component } />:<Navigate to="/home"/>} key={key} />
      );
    }
  );
};

export default getAuthRoutes;
