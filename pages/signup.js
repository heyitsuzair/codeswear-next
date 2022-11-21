import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { addUser } from "../utils/api";
import { useRouter } from "next/router";
import userContext from "../context/user/userContext";

const Signup = () => {
  const router = useRouter();

  const UserContext = useContext(userContext);
  const { user } = UserContext;

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.name) {
      toast.warn("Please Enter Your Name");
      return;
    }
    if (!formValues.email) {
      toast.warn("Please Enter Your Email");
      return;
    }
    if (!formValues.password) {
      toast.warn("Please Enter Password");
      return;
    }
    try {
      const formData = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password,
      };
      const { data } = await axios.post(addUser, formData);

      if (data.error === false) {
        toast.success(data.msg);
        setFormValues({ name: "", email: "", password: "" });
      }
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
      return;
    }
  }, [user]);

  return (
    <div>
      <Head>
        <title>Signup</title>
        <meta
          name="description"
          content="Codeswear-Engineered For Excellence"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/logo.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Create New Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <Link
                href="/login"
                className="font-medium text-pink-600 hover:text-pink-500"
              >
                {" "}
                Login
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name-address" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  onChange={(e) => handleChange(e)}
                  type="text"
                  autoComplete="name"
                  value={formValues.name}
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  onChange={(e) => handleChange(e)}
                  type="email"
                  value={formValues.email}
                  autoComplete="email"
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={(e) => handleChange(e)}
                  value={formValues.password}
                  type="password"
                  autoComplete="current-password"
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 py-2 px-4 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <AiFillLock
                    className="h-5 w-5 text-pink-500 group-hover:text-pink-400"
                    aria-hidden="true"
                  />
                </span>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
