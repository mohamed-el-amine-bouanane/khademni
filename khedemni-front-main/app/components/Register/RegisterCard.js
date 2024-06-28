"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import RegisterButton from "./RegisterButton.js";
import api from "@/app/utils/api.js";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/Auth.jsx";

function RegisterCard(props) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  const [err, setErr] = useState(null);

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^(05|06|07)\d{8}$/;
    return phoneNumberRegex.test(phoneNumber);
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
      if (
        formData.firstName === "" ||
        formData.lastName === "" ||
        formData.email === "" ||
        formData.phoneNumber === "" ||
        formData.email === ""
      ) {
        setErr("Please fill all the fields");
      } else if (!isValidEmail(formData.email)) {
        setErr("Please Enter a Valid Email");
      } else if (!isValidPhoneNumber(formData.phoneNumber)) {
        setErr("Please Enter A valid Phone Number ");
      }
      const response = await api.post(
        "/api/auth/register",
        JSON.stringify(formData)
      );

      if (response.status === 200) {
        const token = response.data?.user?.token;
        await authContext.setUserAuthInfo(token);
        router.refresh()
        router.push("/register/user");
      } else {
        console.error("Registration failed");
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
    <div className="py-16 loginShad rounded-[25px] flex flex-col justify-between gap-10 shadow-lg drop-shadow-xl items-center">
      <form
        className="flex flex-col items-center gap-5 "
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col justify-start items-center gap-6">
          <h2 className="font-extrabold text-5xl text-DarkBlue">Register</h2>
          <p className="text-center">
            Hi dear user, you can access your
            <br /> account from here
          </p>
        </div>
        <div className="flex justify-center w-full gap-7">
          <input
            type="text"
            name="firstName"
            placeholder="Firstname"
            value={formData.firstName}
            onChange={handleChange}
            className="py-3 w-[35%] rounded-[60px] border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Lastname"
            value={formData.lastName}
            onChange={handleChange}
            className="py-3 w-[35%] rounded-[60px] border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="py-3 rounded-[60px] w-3/4 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="PhoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          className="rounded-[60px] w-3/4 py-3 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="rounded-[60px] w-3/4 py-3 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
        />
        {err && (
          <h3 className="text-[18px] text-red-600 font-bold w-full text-center mt-2">
            {err}{" "}
          </h3>
        )}

        <RegisterButton type="submit" />
      </form>
      <div className="flex text-[#0D183E] flex-row mt-8">
        <p className="text-lg">You already have an account? </p>
        <Link href="/login" className="font-bold ml-2 underline text-lg">
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default RegisterCard;
