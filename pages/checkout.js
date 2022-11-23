import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Script from "next/script";
import { AiOutlineDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sub");
  };

  return (
    <div className="container mx-2 sm:mx-auto ">
      <Head>
        <title>Checkout</title>
        <meta
          name="description"
          content="Codeswear-Engineered For Excellence"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="font-bold text-3xl text-center m-auto my-8">Checkout</h1>
      <h2 className="text-xl font-semibold">1. Delivery Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="leading-7 text-sm text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                value={formValues.name}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                value={formValues.email}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="px-2 w-full">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="leading-7 text-sm text-gray-600"
            >
              Address
            </label>
            <textarea
              id="address"
              cols={30}
              rows={2}
              name="address"
              onChange={(e) => handleChange(e)}
              autoComplete="off"
              value={formValues.address}
              className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="leading-7 text-sm text-gray-600"
              >
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                value={formValues.phone}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="zipcode"
                className="leading-7 text-sm text-gray-600"
              >
                ZIP Code
              </label>
              <input
                type="text"
                id="zipcode"
                name="zipcode"
                onChange={(e) => handleChange(e)}
                autoComplete="off"
                value={formValues.zipcode}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto flex">
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label
                htmlFor="state"
                className="leading-7 text-sm text-gray-600"
              >
                State
              </label>
              <input
                type="text"
                id="state"
                readOnly={true}
                values={formValues.state}
                name="state"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="px-2 w-1/2">
            <div className="mb-4">
              <label htmlFor="city" className="leading-7 text-sm text-gray-600">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                readOnly={true}
                values={formValues.city}
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
        </div>
        <h2 className="text-xl font-semibold">2. Review Cart Items & Pay</h2>
        <div className="z-10 sidecart rounded-md bg-pink-100 mt-8 p-8 px-8 w-100 h-full">
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
                      <div className="font-semibold">{cart[k].name}</div>
                      <div className="flex items-center font-semibold text-pink-500 justify-center w-1/3">
                        <AiOutlineMinus
                          className="cursor-pointer"
                          size={20}
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
                          className="cursor-pointer"
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
                          size={20}
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
        </div>
        <div className="mt-4">
          <button
            type="submit"
            className=" items-center gap-2 justify-center mt-4 text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none transition-colors shadow-xl hover:bg-pink-600 rounded text-md disabled:bg-pink-300"
          >
            Pay Rs {subTotal}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
