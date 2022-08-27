import Homepage from "../Layout/Homepage/Homepage";
import CreateEvent from "../Pages/CreateEvent/CreateEvent";
import Edit from "../Pages/Edit/Edit";

import EventDetails from "../Pages/EventView/EventDetails";
import EventView from "../Pages/EventView/EventView";

import GuestList from "../Pages/GuestList/GuestList";
import GuestSelect from "../Pages/GuestList/GuestSelect";
import Home from "../Pages/Home/Home";

const routes = [
    {
        exact:true,
        path: '/home',
        layout: Homepage,
        component:Home
    },
    {
        exact:true,
        path: '/guests',
        layout: Homepage,
        component:GuestList
    },
    {
        exact:true,
        path: '/event/create',
        layout: Homepage,
        component:CreateEvent
    },
    {
        exact:true,
        path: '/event/:id',
        layout: Homepage,
        component:EventView
    },
    {
        exact:true,
        path: '/profile/edit',
        layout: Homepage,
        component:Edit
    },
    {
        path: '/event/detail/:id',
        layout: Homepage,
        component:EventDetails
    },
    {
        path: '/event/guests/:id',
        layout: Homepage,
        component:GuestSelect
    },
]

export default routes;