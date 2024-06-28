"use client";

import { useEffect, useState, createContext } from "react";
import { handleLogin } from "../utils/actions";
import api from "../utils/api";
import decodeToken from "../utils/jwt.js";
const AuthContext = createContext();
const { Provider } = AuthContext;

const clearUserAuthInfo = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setAuthState({
    token: "",
    user: {},
  });
};

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: "",
    user: {},
  });



  const setUserAuthInfo = async (token) => {
    let user = null;
    if (token) {
      const decodedToken = decodeToken(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      if (decodedToken.exp < currentTime) {
        clearUserAuthInfo();
      } else {
        const response = await api.get("/api/users/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        user = response.data;
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify({ token }));
        handleLogin({ user: user, token });
      }
    }

    setAuthState({
      token,
      user,
    });     
  };

  const setAuthClient = async ({ token, user }) => {
    setAuthState({
      token,
      user,
    });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", JSON.stringify({ token }));
  };

  const isUserAuthenticated = typeof window !== "undefined" &&
    Boolean(JSON.parse(localStorage.getItem("token"))?.token ?? false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = JSON.parse(localStorage.getItem("token"))?.token;
    if (token) {
      const decodedToken = decodeToken(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        clearUserAuthInfo();
      } else if (user) {
        setAuthState({ token, user });
      }
    }
  }, []);

  return (
    <Provider
      value={{
        authState,
        setAuthState,
        setUserAuthInfo,
        isUserAuthenticated,
        setAuthClient,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider, clearUserAuthInfo };
