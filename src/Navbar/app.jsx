
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { useState } from "react"

export const NaveApp =()=>{
    const [isLoggedIn, setIsLoggedIn]= useState();

    const handleLogin=()=>setIsLoggedIn(true)
    const handleLogout=()=> setIsLoggedIn(false);

    return(
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
}