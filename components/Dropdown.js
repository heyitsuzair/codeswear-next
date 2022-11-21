import React from "react";

const Dropdown = ({ handleLogout, dropDown }) => {
  return (
    <div
      className={`absolute transition-all opacity-${
        dropDown ? "1" : "0"
      } right-10 top-9 bg-pink-300 rounded-md px-4 py-2 w-40`}
    >
      <ul>
        <li className="py-2 text-sm hover:text-pink-700">My Account</li>
        <li className="py-2 text-sm hover:text-pink-700">Orders</li>
        <li className="py-2 text-sm hover:text-pink-700" onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
