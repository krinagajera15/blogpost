import { Navigate } from "react-router-dom";
import { RouterLayout } from "../Pages/RootLayout";

export const AuthGuard=()=>{

    const logedindata=JSON.parse(localStorage.getItem("LoginData"))

    if(!logedindata){
        return <Navigate to="/login" replace/>;
    }
    return <RouterLayout/>;

}