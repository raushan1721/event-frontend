import { Navigate, Route } from "react-router-dom";

const token = window.localStorage.getItem("isLoggedIn");

const getPrivateRoutes = (routes) => {
  // const token = false;
  return routes.map(
    ({ component: Component, layout: Layout, ...rest }, key) => {
      return (
        <Route
          {...rest}
          element={
            token ? <Layout component={Component} /> : <Navigate to="/signin" />
          }
          key={key}
        />
      );
    }
  );
};

export default getPrivateRoutes;
