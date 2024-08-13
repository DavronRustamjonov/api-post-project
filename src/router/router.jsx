import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Home";
import Models from "../Models";

const router=createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },{
        path: "/home",
        element: <Home/>
    },
    {
        path: "/models",
        element:<Models/>


    }
])
export default router