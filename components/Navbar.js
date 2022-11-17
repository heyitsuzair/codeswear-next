import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start justify-center items-center py-3">
      <div className="logo mx-5">
        <Image
          src="/logo.png"
          height={40}
          width={200}
          alt="Loading..."
          className="w-full"
        />
      </div>
      <div className="nav">
        <ul className="flex space-x-2 font-bold md:text-xl">
          <Link href="/">
            <li>T-Shirts</li>
          </Link>
          <Link href="/">
            <li>Hoodies</li>
          </Link>
          <Link href="/">
            <li>Mugs</li>
          </Link>
          <Link href="/">
            <li>Stickers</li>
          </Link>
        </ul>
      </div>
      <div className="cart absolute right-0 mx-5">
        <AiOutlineShoppingCart size={30} />
      </div>
    </div>
  );
};

export default Navbar;
