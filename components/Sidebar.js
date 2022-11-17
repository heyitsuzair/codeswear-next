import Link from "next/link";
import React, { useRef } from "react";
import {
  AiFillCloseCircle,
  AiOutlineShoppingCart,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";

const Sidebar = () => {
  const ref = useRef();
  const ToggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.add("translate-x-full");
      ref.current.classList.remove("translate-x-0");
    }
  };

  return (
    <>
      <div
        onClick={ToggleCart}
        className="cursor-pointer cart absolute right-0 mx-5"
      >
        <AiOutlineShoppingCart size={30} />
      </div>
      <div
        className="z-10 sidecart transition-transform translate-x-full transform fixed top-0 right-0 bg-pink-100 py-10 px-8 w-100 h-full"
        ref={ref}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={ToggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        <ol className="list-decimal font-semibold">
          <li>
            <div className="item flex items-center my-5">
              <div className="w-2/3 font-semibold">Tshirt-Wear The Code</div>
              <div className="flex items-center font-semibold text-pink-500 justify-center w-1/3">
                <AiOutlineMinus className="cursor-pointer" size={30} />
                <span className="mx-4">1</span>
                <AiOutlinePlus className="cursor-pointer" size={30} />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex items-center my-5">
              <div className="w-2/3 font-semibold">Tshirt-Wear The Code</div>
              <div className="flex items-center font-semibold text-pink-500 justify-center w-1/3">
                <AiOutlineMinus className="cursor-pointer" size={30} />
                <span className="mx-4">1</span>
                <AiOutlinePlus className="cursor-pointer" size={30} />
              </div>
            </div>
          </li>
          <li>
            <div className="item flex items-center my-5">
              <div className="w-2/3 font-semibold">Tshirt-Wear The Code</div>
              <div className="flex items-center font-semibold text-pink-500 justify-center w-1/3">
                <AiOutlineMinus className="cursor-pointer" size={30} />
                <span className="mx-4">1</span>
                <AiOutlinePlus className="cursor-pointer" size={30} />
              </div>
            </div>
          </li>
        </ol>
        <Link
          href="checkout"
          className="flex mx-auto items-center gap-2 w-full justify-center mt-16 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none transition-colors hover:bg-pink-600 rounded text-md"
        >
          <BsFillBagCheckFill /> Checkout
        </Link>
        <div className="cursor-pointer transition-colors flex mx-auto items-center gap-2 w-full justify-center mt-2 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-md">
          <AiOutlineDelete /> Clear Cart
        </div>
      </div>
    </>
  );
};

export default Sidebar;
