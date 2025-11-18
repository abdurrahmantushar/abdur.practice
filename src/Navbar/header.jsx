import { Link } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    setIsLoggedIn(false);
  };

  return (
    <div className="bg-white p-5">
      <ul className="flex justify-end">
        <li className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1">
          <Link to="/">Home</Link>
        </li>
        <li className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1">
          <Link to="/contact">Contact</Link>
        </li>
        <li className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1">
          <Link to="/about">About</Link>
        </li>

        {isLoggedIn ? (
          <li
            className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1"
            onClick={handleLogout}
          >
            <Link to="/">Sign-Out</Link>
          </li>
        ) : (
          <li
            className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1"
            onClick={handleLogin}
          >
            <Link to="/signup">Sign-Up</Link>
          </li>
        )}
      </ul>
    </div>
  );
};
