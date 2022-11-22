import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserState from "../context/user/UserState";
import { useRouter } from "next/router";
import Toast from "../components/Toast";
import ProgressBar from "../components/ProgressBar";

function MyApp({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);

  const [progress, setProgress] = useState(0);

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
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + 1;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, color };
    }
    setCart(newCart);
    saveCart(newCart);

    toast.success("Item Added To Cart!");

    return true;
  };

  const clearCart = () => {
    setCart({});
    saveCart({});

    toast.success("Cart Cleared!");
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

    setCart(newCart);
    saveCart(newCart);

    router.push("/checkout");

    return true;
  };

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
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
  }, [router.query]);

  return (
    <UserState>
      <ProgressBar progress={progress} />
      <Toast />
      <Navbar
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        subTotal={subTotal}
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
    </UserState>
  );
}

export default MyApp;
