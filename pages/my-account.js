import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import userContext from "../context/user/userContext";
import Head from "next/head";

const MyAccount = () => {
  const router = useRouter();
  const UserContext = useContext(userContext);
  const { user } = UserContext;
  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }
  }, [user]);

  return (
    <div className="container">
      <Head>
        <title>My Account</title>
        <meta name="description" content="Orders" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default MyAccount;
