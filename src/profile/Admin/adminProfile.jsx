import { Link, Outlet } from "react-router-dom";

export const AdminProfile = () => {
  const data = JSON.parse(localStorage.getItem("userData"));
  const name = data?.user?.name || "Admin";

  return (
    <div>
      <h1 className="font-semibold text-center">{name}</h1>
      <ul className="flex justify-center">
        <li className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1">
          <Link to="product">Products</Link>
        </li>
        <li className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1">
          <Link to="userlist">Users</Link>
        </li>
        <li className="text-[20px] font-semibold pr-10 hover:underline hover:-translate-y-1">
          <Link to="orders">Orders</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
};
