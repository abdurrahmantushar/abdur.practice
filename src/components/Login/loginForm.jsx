export const Login=()=>{
    
    return(
        <div className=" flex justify-center items-center min-h-screen bg-indigo-300">         
           <div className=" bg-white  w-[300px] rounded-xl p-6 shdaow-lg ">
            <h2 className="text-indigo-600 text-xl font-semibold text-center mb-5 font-mono"> Login </h2>
            
              <div className=" mb-4">
                <label className=" text-gray-700 font-mono font-semibold text-x"> E-Mail </label>
                <input
                placeholder="Email"
                name="email"
                type="email"
                className=" w-full mt-1 px-3 py-2 bg-gray-300 rounded-lg outline-none focus:ring-indigo-300 focus:border-transparent "
                />
            <br/>
            </div>
            <div className="mb-4">
            <label className=" text-gray-700 font-mono font-semibold text-x"> Password</label>
            <input
            placeholder="Password"
            name="password"
            type="password"
            className="w-full mt-1 px-3 py-2 bg-gray-300 rounded-lg outline-none focus:ring-indigo-300 focus:border-transparent"
            />
            <br/>
            </div>
             <button className=" w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800 font-mono font-semibold">Login</button>
            </div>       
        </div>
    )
}