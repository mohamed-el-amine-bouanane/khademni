"use client"
import { ALGERIA, BACKEND_URL } from '@/app/constants';
import { AuthContext } from '@/app/context/Auth';
import api from '@/app/utils/api';
import user from '@/public/chat/user.png'
import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditProfileClient = ({profileUser}) => {
    const [firstName,setfirstName]=useState(profileUser.firstName)
  const [lastName,setlastName]= useState(profileUser.lastName)
  const [email,setEmail]=useState(profileUser.email)
  const [phoneNumber,setPhoneNumber] = useState(profileUser.phoneNumber)
  const [password,setPassword] = useState("")
  const authContext = useContext(AuthContext);


  const handleUpdate =async()=>{
    const data = {
        firstName,
        lastName,
        email,
        phoneNumber,
        password
    }
    try {
        const response = await api.put(
          "/api/users/updateClient/",
          data,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authContext.authState?.token}`,
            },
          }
        );
        if (response.status === 200) {
            toast.success("Profile Updated successfully")
        } else {
          toast.error("Update failed");
        }
      } catch (error) {
        if (error.response?.data?.error) {
          toast.error(error.response.data.error);
        } else {
          toast.error(error.message);
        }
      }
  }


    return ( 
    <div>
        <div className='w-full flex flex-col justify-center items-center mt-8'>
            <ToastContainer />
            <div className='flex flex-col justify-center items-center '>
                <Image src={user} alt="user image" width={120}  height={120} className="object-cover overflow-hidden aspect-square rounded-full" />

            </div>
            <h3 className='text-[28px] font-bold text-[#27419E]'>{profileUser.firstName}  {profileUser.lastName}</h3>
            <div className="flex justify-center w-full gap-7 mt-6">
            <input
                type="text"
                name="firstName"
                placeholder="Firstname"
                value={firstName}
                onChange={(e)=>{setfirstName(e.target.value)}}
                className="py-3 w-[250px] rounded-[60px] border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
            />
            <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e)=>{setlastName(e.target.value)}}
                placeholder="Lastname"
                className="py-3 w-[250px] rounded-[60px] border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
            />
            </div>
            <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Email"
            className="mt-6 py-3 rounded-[60px] w-[520px] border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
            />
            <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={(e)=>{setPhoneNumber(e.target.value)}}
            placeholder="PhoneNumber"
            className="mt-6 rounded-[60px] w-[520px] py-3 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
            />
            <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="Password"
            className="mt-6 rounded-[60px] w-[520px] py-3 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
            />
            <button onClick={handleUpdate }className='w-[350px] mx-auto bg-[#27419E] p-2 rounded-xl text-white text-semibold text-[18px] my-6 hover:bg-blue-950 '>
                Update
            </button>
        </div>
        
    </div> );
}
 
export default EditProfileClient;