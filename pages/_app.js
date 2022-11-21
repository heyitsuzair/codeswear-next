import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  const router = useRouter();

  const saveCart = (myCart) => {
    localStorage.setItem("cart", JSON.stringify(myCart));
    let subt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]].price * myCart[keys[i]].qty;
    }
    setSubTotal(subt);
    localStorage.setItem("subtotal", JSON.stringify(subt));
  };

  const addToCart = (itemCode, quantity, price, name, size, color) => {
    if (color === null) {
      toast.warn("Please Select Color");
      return false;
    }
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, color };
    }
    setCart(newCart);
    saveCart(newCart);

    return true;
  };

  const clearCart = () => {
    setCart({});
    saveCart({});
  };

  const removeFromCart = (itemCode, qty, price, name, size, color) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemCode, qty, price, name, size, color) => {
    let newCart = { itemCode: { qty: 1, price, name, size, color } };

    if (color === null) {
      toast.warn("Please Select Color");
      return false;
    }
    setCart(newCart);
    saveCart(newCart);

    router.push("/checkout");

    return true;
  };

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")));
      }
      if (localStorage.getItem("subtotal")) {
        setSubTotal(JSON.parse(localStorage.getItem("subtotal")));
      }
    } catch (error) {
      console.warn(error);
      localStorage.clear();
    }
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
      <ToastContainer
        autoClose={2000}
        position="top-right"
        pauseOnHover={true}
        draggable={true}
        theme="light"
        toastClassName="toast-custom"
      />
      <Component
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
        buyNow={buyNow}
        {...pageProps}
      />
      <Footer
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
      />
    </>
  );
}

export default MyApp;
