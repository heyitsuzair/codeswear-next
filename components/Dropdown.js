import React from "react";
import Link from "next/link";

const Dropdown = ({ handleLogout, dropDown, setDropDown }) => {
  return (
    <div
      className={`absolute transition-all opacity-${
        dropDown ? "1" : "0 hidden"
      } right-10 top-9  bg-white shadow-lg border rounded-lg px-4 py-2 w-40`}
    >
      <ul>
        <Link href="/my-account" onClick={() => setDropDown(false)}>
          <li className="py-2 text-sm hover:text-pink-700">My Account</li>
        </Link>
        <Link href="/orders" onClick={() => setDropDown(false)}>
          <li className="py-2 text-sm hover:text-pink-700">Orders</li>
        </Link>
        <li
          onClick={() => setDropDown(false)}
          className="py-2 text-sm hover:text-pink-700"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
