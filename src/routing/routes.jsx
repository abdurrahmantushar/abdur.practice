import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { NaveApp } from "../Navbar/app"
import { Products } from "../components/ForntPage/folder/allProducts"
import { About } from "../Navbar/about"

import { SignUpForm } from "../components/Login/signUpForm"
import { Contact } from "../Navbar/contact"
import { Login } from "../components/Login/loginForm"
import { SigleProductsDetails } from "../components/singlePageProduct"
import { AdminProduct } from "../profile/Admin/adminProducts"
import { AdminProfile } from "../profile/Admin/adminProfile"
import { EditProducts } from "../profile/Admin/AdminEditProductForm"
import { AddProducts } from "../profile/Admin/adminProductFrom"
import { UserList } from "../profile/Admin/userLIst"
import { UserProfile } from "../profile/User/userProfile"
import { PrivateRoutes } from "./privateRoute"


export const AppRoutes=()=>{

     const router= createBrowserRouter([
        {
            path:'/',
            element:<NaveApp/>,
            children:[
                {
                    index: true,
                    element:<Products/>
                },
                {
                    path:'about',
                    element:<About/>
                },
                {
                    path:'contact',
                    element:<Contact/>
                },
                {
                    path:'signup',
                    element: <SignUpForm/>
                },
                {
                    path:'login',
                    element: <Login/>
                },
                {
                    path:'products/:id',
                    element: <SigleProductsDetails/>
                },
                
            ]},

{
  path: "dashboard",
  element: <PrivateRoutes />,
  children: [
    {
      path: "adminprofile",
      element: <AdminProfile />,
      children: [
        {
          path: "product",
          element: <AdminProduct />
        },
        {
          path: "editproducts",
          element: <EditProducts />
        },
        {
          path: "addproducts",
          element: <AddProducts />
        },
        {
          path: "userlist",
          element: <UserList />
        }
      ]
    },

    {
      path: "userprofile",
      element: <UserProfile />
    }
  ]
}

        
     ]);
     return <RouterProvider router={router}/>
}