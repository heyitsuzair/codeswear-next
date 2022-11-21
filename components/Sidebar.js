import Link from "next/link";
import React, { useContext, useEffect, useRef } from "react";
import {
  AiFillCloseCircle,
  AiOutlineShoppingCart,
  AiOutlinePlus,
  AiOutlineMinus,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/router";
import userContext from "../context/user/userContext";

const Sidebar = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const ref = useRef();

  const router = useRouter();

  const UserContext = useContext(userContext);

  const { user, setUser } = UserContext;

  const ToggleCart = () => {
    if (ref.current.classList.contains("translate-x-full")) {
      ref.current.classList.remove("translate-x-full");
      ref.current.classList.add("translate-x-0");
    } else {
      ref.current.classList.add("translate-x-full");
      ref.current.classList.remove("translate-x-0");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("codeswear-token");
    setUser(null);
    router.push("/");
  };

  return (
    <>
      <div className="cursor-pointer cart absolute right-0 mx-5 flex gap-2 items-center">
        {user ? (
          <>
            <FiLogOut
              onClick={() => handleLogout()}
              className="hover:text-pink-600"
              size={30}
            />
          </>
        ) : (
          <Link href="/login">
            <MdAccountCircle className="hover:text-pink-600" size={30} />
          </Link>
        )}

        <AiOutlineShoppingCart
          className="hover:text-pink-600"
          onClick={ToggleCart}
          size={30}
        />
      </div>
      <div
        className={`${
          Object.keys(cart).length !== 0 ? "translate-x-0" : "translate-x-full"
        } z-10 sidecart transition-transform  transform fixed top-0 right-0 bg-pink-100 py-10 px-8 w-100 h-full overflow-y-scroll`}
        ref={ref}
      >
        <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
        <span
          onClick={ToggleCart}
          className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
        >
          <AiFillCloseCircle />
        </span>
        {Object.keys(cart).length === 0 ? (
          <div className="my-4 font-semibold text-center">
            Your Cart Is Empty
          </div>
        ) : (
          <ol className="list-decimal font-semibold">
            {Object.keys(cart).map((k) => {
              return (
                <li key={k}>
                  <div className="item flex items-center my-5">
                    <div className="w-2/3 font-semibold">
                      {cart[k].name} ({cart[k].size && cart[k].size + "/"}
                      {cart[k].color && cart[k].color.toUpperCase()})
                    </div>
                    <div className="flex items-center font-semibold text-pink-500 justify-center w-1/3">
                      <AiOutlineMinus
                        className="cursor-pointer font-bold"
                        size={70}
                        onClick={() =>
                          removeFromCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          )
                        }
                      />
                      <span className="mx-4">{cart[k].qty}</span>
                      <AiOutlinePlus
                        className="cursor-pointer font-bold"
                        onClick={() =>
                          addToCart(
                            k,
                            1,
                            cart[k].price,
                            cart[k].name,
                            cart[k].size,
                            cart[k].variant
                          )
                        }
                        size={70}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        )}
        <span>
          Total: <strong>Rs {subTotal}</strong>
        </span>
        <Link
          href="/checkout"
          className="flex mx-auto items-center gap-2 w-full justify-center mt-4 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none transition-colors hover:bg-pink-600 rounded text-md"
        >
          <BsFillBagCheckFill /> Checkout
        </Link>
        <div
          className="cursor-pointer transition-colors flex mx-auto items-center gap-2 w-full justify-center mt-2 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-md"
          onClick={clearCart}
        >
          <AiOutlineDelete /> Clear Cart
        </div>
      </div>
    </>
  );
};

export default Sidebar;
