import { createContext, useState, useEffect } from "react";
import Cookie from "js-cookie";
import * as HomeService from "../Pages/Home/services/home.service";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const token = Cookie.get("token");

  useEffect(() => {
    if (token) {
      HomeService.getCurrentUser(token).then(({ data }) => {
        setUser(data);
      });
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
