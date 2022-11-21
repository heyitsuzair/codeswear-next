import React, { useEffect, useState } from "react";
import userContext from "./userContext";

const UserState = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("codeswear-token")) {
      setUser(localStorage.getItem("codeswear-token"));
    }
  }, []);

  return (
    <userContext.Provider value={{ setUser, user }}>
      {children}
    </userContext.Provider>
  );
};

export default UserState;
