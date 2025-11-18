import { Outlet,Navigate } from "react-router-dom";

export const PrivateRoutes=()=>{
    const data= JSON.parse(localStorage.getItem('userData'));
    return data?.isSignIn ?<Outlet/>: <Navigate to='/login'/>
}