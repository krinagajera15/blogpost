import { createBrowserRouter } from "react-router-dom";
import { Homepage } from "../Pages/HomePage";
import { CreateNewPost } from "../Pages/Createnewpost";
import { Login } from "../Pages/SingninPage";
// import { RouterLayout } from "../Pages/RootLayout";
import { PostDetail } from "./PostDetail";
import { AuthGuard } from "../Guard/AuthGuard";
import { NodataFound } from "./NodataFound";
import { ExplorePostPage } from "../Pages/ExplorePost";
import { PageNation } from "./PageiNation";
import {Footr} from "./Footer";
import { Editpost } from "./EditPostModel";


export const routere=createBrowserRouter([
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/",
        element:<AuthGuard/>,
        children:[//je page ma navbar rakhva hoy te page ne children ni under rakhva
            {
                path:"/",
                element:<Homepage/>
            },
            {
                path:"/new-post",
                element:<CreateNewPost/>
            },
            {
                path:"/posts/:singlpge",
                element:<PostDetail/>
            }, 
            {
                path:"/explorpost",
                element:<ExplorePostPage/>
            }, 
            {
                path:"/pagenation",
                element:<PageNation/>
            }
           

        ]
    },
    {
        path:"*",
        element:<NodataFound/>
    },
    {
        path:"/footer",
        element:<Footr/>
    },
    {
        path:"/model",
        element:<Editpost/>
    },
   
   
])