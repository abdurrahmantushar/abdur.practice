import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 w-[400px] p-8 rounded-2xl shadow-lg">
        <h2 className="text-white text-2xl font-semibold text-center mb-6">
          Sign Up
        </h2>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          onSubmit={(values) => {
            const { email, password, name } = values;

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
          {({ handleChange, handleSubmit, values }) => (
            <form onSubmit={handleSubmit} className="space-y-4">

              
              <div>
                <label className="text-gray-300">Email:</label>
                <input
                  required
                  onChange={handleChange}
                  value={values.email}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded-lg 
                             border border-gray-600 outline-none focus:ring-2 
                             focus:ring-yellow-300 focus:border-transparent"
                />
              </div>

              
              <div>
                <label className="text-gray-300">Password:</label>
                <input
                  required
                  onChange={handleChange}
                  value={values.password}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded-lg 
                             border border-gray-600 outline-none focus:ring-2 
                             focus:ring-yellow-300 focus:border-transparent"
                />
              </div>

              
              <div>
                <label className="text-gray-300">Name:</label>
                <input
                  required
                  value={values.name}
                  onChange={handleChange}
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full mt-1 px-3 py-2 bg-gray-700 text-white rounded-lg 
                             border border-gray-600 outline-none focus:ring-2 
                             focus:ring-yellow-300 focus:border-transparent"
                />
              </div>

              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg 
                           hover:bg-blue-700 transition font-semibold"
              >
                Submit
              </button>

              <p className="text-gray-300 text-center mt-2">
                
                <a href="/login" className="text-blue-400 hover:underline">
                  Login
                </a>
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};
