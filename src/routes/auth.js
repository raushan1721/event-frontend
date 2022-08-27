import AuthLayout from "../Layout/AuthLayout.js/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Signup from "../Pages/Auth/Signup/Signup";

const routes = [
    {
        exact:true,
        path: '/signin',
        layout: AuthLayout,
        component:Login
    },
    {
        exact:true,
        path: '/signup',
        layout: AuthLayout,
        component:Signup
    },


]

export default routes;