import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import userContext from "../context/user/userContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import { addOrder } from "../utils/api";

const Checkout = ({ cart, addToCart, removeFromCart, subTotal, clearCart }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    zipcode: "",
    address: "",
    city: "Lahore",
    state: "Punjab",
  });

  const [card, setCard] = useState({
    card_no: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
  });

  const UserContext = useContext(userContext);
  const { user } = UserContext;

  const router = useRouter();

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.name === "") {
      toast.error("Please Enter Your Name");
      return;
    }
    if (formValues.email === "") {
      toast.error("Please Enter Your Email");
      return;
    }
    if (formValues.address === "") {
      toast.error("Please Enter Your Address");
      return;
    }
    if (formValues.phone === "") {
      toast.error("Please Enter Your Phone");
      return;
    }
    if (formValues.zipcode === "") {
      toast.error("Please Enter Your ZIP Code");
      return;
    }
    if (formValues.state === "") {
      toast.error("Please Enter Your State");
      return;
    }
    if (formValues.city === "") {
      toast.error("Please Enter Your City");
      return;
    }
    if (card.card_no.length < 16) {
      toast.error("Enter Valid Card No");
      return;
    }
    if (card.exp_month.length < 2 || parseInt(card.exp_month) > 12) {
      toast.error("Enter Valid Expiry Month");
      return;
    }
    if (card.exp_year.length < 4 || card.exp_year < new Date().getFullYear()) {
      toast.error("Enter Valid Expiry Year");
      return;
    }
    if (card.cvc.length < 3) {
      toast.error("Enter Valid CVC");
      return;
    }

    try {
      const dataToSend = {
        email: "uzairdevil354123@gmail.com",
        card_no: card.card_no,
        card_year: card.exp_year,
        card_exp: card.exp_month,
        card_cvc: card.cvc,
        products: cart,
        address: formValues.address,
        total: subTotal,
      };
      const TOKEN = JSON.parse(localStorage.getItem("codeswear-token"));

      const { data } = await axios.post(addOrder, dataToSend, {
        headers: {
          token: TOKEN,
        },
      });
      if (data.hasBeenCharged === true) {
        toast.success("Payment Successful!");
        router.push("/");
        clearCart();
      } else {
        toast.warn("Something Went Wrong!Please Contact Your Bank");
      }
    } catch (error) {
      console.error(error.response.data.msg);
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user]);

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
                value={formValues.state}
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
                value={formValues.city}
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
          <div className="card-form flex gap-8">
            <div className="mb-4">
              <label
                htmlFor="card_no"
                className="leading-7 text-sm text-gray-600"
              >
                Card No
              </label>
              <input
                type="card_no"
                id="card_no"
                maxLength={16}
                onChange={(e) =>
                  setCard({ ...card, [e.target.name]: e.target.value })
                }
                value={card.card_no}
                name="card_no"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="exp_month"
                className="leading-7 text-sm text-gray-600"
              >
                Expiry Month
              </label>
              <input
                type="exp_month"
                id="exp_month"
                maxLength={2}
                onChange={(e) =>
                  setCard({ ...card, [e.target.name]: e.target.value })
                }
                value={card.exp_month}
                name="exp_month"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="exp_year"
                className="leading-7 text-sm text-gray-600"
              >
                Expiry Year
              </label>
              <input
                type="exp_year"
                id="exp_year"
                maxLength={4}
                onChange={(e) =>
                  setCard({ ...card, [e.target.name]: e.target.value })
                }
                value={card.exp_year}
                name="exp_year"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cvc" className="leading-7 text-sm text-gray-600">
                CVC
              </label>
              <input
                type="cvc"
                id="cvc"
                maxLength={3}
                onChange={(e) =>
                  setCard({ ...card, [e.target.name]: e.target.value })
                }
                value={card.cvc}
                name="cvc"
                className="w-full bg-white rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
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
          <span className="ml-8">
            Pay Securely With{" "}
            <span className="text-pink-500 font-semibold">Stripe</span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
