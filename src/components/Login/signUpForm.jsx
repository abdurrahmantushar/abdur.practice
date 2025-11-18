import { Formik } from "formik";
// import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const SignUpForm=()=>{

    const navigate=useNavigate();
    return(
        <Formik
        initialValues={{name:'',email:'',password:''}}
        onSubmit={(values)=>{
            const {email,password,name}= values;
                if (email === "tushar1@gmail.com" && password === "123456") {
      
      const admin = {
        name: "Admin",
        email,
        admin: true,
      };

      localStorage.setItem(
        "userData",
        JSON.stringify({ user: admin, isSignIn: true })
      );

      navigate("/dashboard/adminprofile", { state: values });
    } else {
      
      const user = {
        name,
        email,
        admin: false,
      };

      localStorage.setItem(
        "userData",
        JSON.stringify({ user, isSignIn: true })
      );

      navigate("/dashboard/userprofile", { state: values });
    }
        }}
        >
            {({ handleChange,handleSubmit,values})=>(
                <form onSubmit={handleSubmit}>
                <div>
                    <label> Email: </label>
                    <input 
                    required
                    onChange={handleChange}
                    value={values.email}
                    type='email'
                    name="email"
                    placeholder='Enter Your E-mail'
                    />
                </div>
                <div >
                    <label > Password: </label>
                    <input
                    required
                    onChange={handleChange}
                    value={values.password}
                    type='password'
                    name="password"
                    placeholder='Enter Your Password'
                    />
                    <br/>

                <div>
                    <label> Name: </label>
                    <input 
                    required
                    value={values.name}
                    onChange={handleChange}
                    type='text'
                    name="name"
                    placeholder='Enter Your Name'
                    />
                </div>
                    <button type="submit">Submit</button>
                    <p> Or <a href="login">Login</a></p>
                </div>
            </form>
            )}

        </Formik>
    )
}