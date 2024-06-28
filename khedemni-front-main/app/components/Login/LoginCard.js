"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import api from "@/app/utils/api.js";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/Auth.jsx";

function LoginCard(props) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    setErr(null);
    e.preventDefault();
    try {
      if (formData.email === "" || formData.password === "") {
        setErr("Please fill all the fields");
      } else if (!isValidEmail(formData.email)) {
        setErr("Please Enter a Valid Email");
      }
      const response = await api.post(
        "/api/auth/login",
        JSON.stringify(formData)
      );

      if (response.status === 200) {
        const token = response.data?.token;
        const role = response.data?.role;
        await authContext.setUserAuthInfo(token);
        // router.refresh();
        if (role == "user") router.push("/register/user");
        else router.push("/offers");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      if (error.response?.data?.error) {
        setErr(error.response.data.error);
      } else {
        setErr(error.message);
      }
    }
  };

  return (
    <div className="px-20 py-16 loginShad rounded-[25px] flex flex-col justify-between gap-10 shadow-lg drop-shadow-xl items-center">
      <form
        className="flex flex-col items-center gap-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start items-center gap-6">
          <h2 className="font-extrabold text-5xl text-DarkBlue">Log in</h2>
          <p className="text-center">
            Hi dear user, you can access your
            <br /> account from here
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="h-14 w-96 rounded-[60px] border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="h-14 w-96 rounded-[60px] border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
          />
        </div>
        {err && (
          <h3 className="text-[18px] text-red-600 font-bold w-full text-center mt-2">
            {err}
          </h3>
        )}
        <LoginButton type="submit" />
      </form>

      <div className="flex text-[#0D183E] flex-row mt-8">
        <p className="text-lg">You don't have an account?</p>
        <Link href="/register" className="font-bold ml-2 underline text-lg">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default LoginCard;
