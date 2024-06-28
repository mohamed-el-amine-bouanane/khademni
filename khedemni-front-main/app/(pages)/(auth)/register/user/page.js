"use client";

import { ALGERIA, BACKEND_URL } from "@/app/constants/index.js";
import React, { useState, useRef, useContext, useEffect } from "react";
import camera from "@/public/SignUp/camera.svg";
import reviewer from "@/public/Landing/reviewer.png";
import { AuthContext } from "@/app/context/Auth.jsx";
import Image from "next/image";
import api from "@/app/utils/api.js";
import { useRouter } from "next/navigation";

function ChooseRole() {
  const [selectedRole, setSelectedRole] = useState(null);
  const [address, setAddress] = useState([{ wilaya: "", commune: "" }]);
  const [description, setDescription] = useState("");
  const [previewPhoto, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [err, setErr] = useState(null);
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleAddressChange = (index, field, value) => {
    const newAddress = [...address];
    newAddress[index][field] = value;
    setAddress(newAddress);
  };

  const handleAddAddress = () => {
    const lastAddress = address[address.length - 1];
    if (lastAddress.wilaya) {
      setAddress([...address, { wilaya: "", commune: "" }]);
    } else {
      alert(
        "Please fill in the current address fields before adding a new one."
      );
    }
  };

  const handleSubmit = async (event) => {
    setErr(null);
    event.preventDefault();
    const formData = new FormData();
    if (selectedRole === "Tasker") {
      if (file) {
        formData.append("profilePicture", file);
      }
      formData.append("description", description);
      if (address.slice(0,-1)["wilaya"]=="")
      formData.append("Addresses", JSON.stringify(address.slice(0,-1)));
    else formData.append("Addresses", JSON.stringify(address));

      try {
        const response = await api.post(
          "/api/auth/register/tasker/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${authContext.authState?.token}`,
            },
          }
        );
        if (response.status === 200) {
          const token = response.data?.user?.token;
          await authContext.setUserAuthInfo(token);
          router.refresh();
          router.push("/offers");
          router.push("/offers");
        } else {
          setErr("Register failed");
        }
      } catch (error) {
        if (error.response?.data?.error) {
          setErr(error.response.data.error);
        } else {
          setErr(error.message);
        }
      }
    } else {
      try {
        const response = await api.post(
          "/api/auth/register/client/",
          {},
          {
            headers: {
              Authorization: `Bearer ${authContext.authState?.token}`,
            },
          }
        );
        if (response.status === 200) {
          const token = response.data?.user?.token;
          await authContext.setUserAuthInfo(token);
          router.refresh();
          router.push("/offers");
        } else {
          setErr("Register failed");
        }

        setPreview(null);
      } catch (error) {
        if (error.response?.data?.error) {
          setErr(error.response.data.error);
        } else {
          setErr(error.message);
        }
      }
    }
  };

  const fileInputRef = useRef(null);
  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="py-40 flex justify-center items-center">
      <div className="py-16 px-20 loginShad rounded-[25px] flex flex-col justify-between gap-10 shadow-lg drop-shadow-xl items-center">
        <div className="flex flex-col justify-start items-center gap-6">
          <h2 className="font-extrabold text-5xl text-[#27419E]">Register</h2>
          <p className="text-center">
            Hi dear user, you can access your
            <br /> account from here
          </p>
        </div>
        <div className="flex justify-center gap-5 mb-6">
          <button
            className={`py-8 px-10 mx-2 border-2 rounded-lg ${
              selectedRole === "Client" ? "border-[#5040E9]" : "border-gray-300"
            }`}
            onClick={() => handleRoleSelect("Client")}
          >
            <div className="flex flex-col items-center">
              <span className="text-[#5040E9] font-semibold text-2xl mb-1">
                👤
              </span>
              <span className="text-gray-700">Client</span>
            </div>
          </button>
          <button
            className={`py-8 px-10 mx-2 border-2 rounded-lg ${
              selectedRole === "Tasker" ? "border-[#5040E9]" : "border-gray-300"
            }`}
            onClick={() => handleRoleSelect("Tasker")}
          >
            <div className="flex flex-col items-center">
              <span className="text-[#5040E9] text-2xl font-semibold mb-1">
                🛠️
              </span>
              <span className="text-gray-700">Tasker</span>
            </div>
          </button>
        </div>
        {selectedRole === "Tasker" && (
          <div className="w-full flex flex-col items-center gap-5 justify-center ">
            <div className="rounded-full border-2  w-[95px] border-secondaryColor  relative group">
              <Image
                src={previewPhoto ?? reviewer}
                height={93}
                width={93}
                quality={100}
                alt="profile"
                className="overflow-hidden object-cover aspect-square h-[93px] rounded-full w-[93px]"
              />
              <div
                onClick={handleUpload}
                className="group-hover:block cursor-pointer hidden bg-black bg-opacity-50 absolute bottom-0 left-0 right-0 rounded-b-full rounded-x-full w-full h-1/2"
              >
                <div className="flex justify-center items-center h-full">
                  <Image src={camera} width={35} alt="camera" />
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <label className="flex flex-col self-start w-full">
              <span className="text-mainColor text-left font-semibold mb-2">
                Description:
              </span>
              <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                className="p-3 border resize-none border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
              />
            </label>
            <p className="text-mainColor text-left font-semibold mb-2 self-start">
              Your locations  :
            </p>

            {address.map((addr, index) => (
              <div key={index} className="flex gap-5 justify-between mb-4">
                <select
                  name="wilaya"
                  value={addr.wilaya}
                  onChange={(e) =>
                    handleAddressChange(index, "wilaya", e.target.value)
                  }
                  className="cursor-pointer rounded-2xl px-5 py-4 w-40 lg:w-52"
                >
                  <option value={""}>Choisir La Wilaya</option>
                  {Object.keys(ALGERIA)?.map((wilaya) => (
                    <option
                      key={wilaya}
                      value={wilaya}
                      className="cursor-pointer"
                    >
                      {wilaya}
                    </option>
                  ))}
                </select>
                <select
                  name="commune"
                  value={addr.commune}
                  onChange={(e) =>
                    handleAddressChange(index, "commune", e.target.value)
                  }
                  className="cursor-pointer rounded-2xl px-5 py-4 w-40 lg:w-52"
                >
                  <option value={""}>Choisir La Commune</option>
                  {ALGERIA &&
                    ALGERIA[addr.wilaya]?.communes.map((commune) => (
                      <option
                        key={commune}
                        value={commune}
                        className="cursor-pointer"
                      >
                        {commune}
                      </option>
                    ))}
                </select>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAddress}
              className="bg-blue-500 self-start ml-1 mt-3 text-white py-2 px-4 rounded mb-4"
            >
              Add Address
            </button>
          </div>
        )}
        {err && (
          <h3 className="text-[18px] text-red-600 font-bold w-full text-center mt-2">
            {err}
          </h3>
        )}
        <button
          onClick={handleSubmit}
          className="flex bg-[#27419E] justify-center cursor-pointer items-center rounded-[60px] w-3/4 h-14  text-white font-bold text-lg border-DarkBlue border-[3px] "
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default ChooseRole;
