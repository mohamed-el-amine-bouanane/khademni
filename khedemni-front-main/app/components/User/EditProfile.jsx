"use client"
import { ALGERIA, BACKEND_URL } from '@/app/constants';
import { AuthContext } from '@/app/context/Auth';
import api from '@/app/utils/api';
import edit from '@/public/profile/edit.svg'
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OfferCard from '../Offer/OfferCard';

const EditProfile = ({profileUser}) => {
  const [address, setAddress] = useState([{ wilaya: "", commune: "" }]);
  const [preview, setPreview] = useState(BACKEND_URL+"/uploads/pictures/" + profileUser.taskers[0].profilePicture);

  const fileInputRef = useRef(null);
  const [image,setImage] = useState(null)

  const handleDivClick = () => {
      fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      setImage(file)
      if (file) {
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
      }
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

  const [firstName,setfirstName]=useState(profileUser.firstName)
  const [lastName,setlastName]= useState(profileUser.lastName)
  const [email,setEmail]=useState(profileUser.email)
  const [phoneNumber,setPhoneNumber] = useState(profileUser.phoneNumber)
  const [password,setPassword] = useState("")
  const [description,setDescription] = useState(profileUser?.taskers[0].description)
  const [tasks,setTasks] = useState(null)
  const authContext = useContext(AuthContext);
  const [isLoading , setIsLoading] = useState(true)

  const handleDeleteAddress = (index) => {
    const newAddress = address.filter((_, addrIndex) => addrIndex !== index);
    setAddress(newAddress);
  };


  const handleUpdate =async ()=>{
    const formData = new FormData();
      if (image) {
        formData.append("profilePicture", image);
      }
      formData.append("description", description);
      formData.append('phoneNumber',phoneNumber);
      formData.append('email',email);
      formData.append('firstName',firstName);
      formData.append('password',password);

      formData.append('lastName',lastName)
      if (address.slice(0,-1)["wilaya"]=="")
      formData.append("addresses", JSON.stringify(address.slice(0,-1)));
    else formData.append("addresses", JSON.stringify(address));

      try {
        const response = await api.put(
          "/api/users/updateTasker/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
  useEffect(()=>{
    const getMyTasks = async()=>{
      try{

        const response = await api.get("/api/tasks/mytasks/" ,{headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.authState?.token}`,
          },});
          
        const data = response.data.data
        setTasks(data)
      }
      catch (error)
      {
        if(authContext.authState?.token)
        {
          if (error.response?.data?.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error(error.message);
          }
        }
        
      }
    }

    const getMyAddress = async()=>{
      try{

        const response = await api.get("api/users/addresses/"+authContext.authState.user.id ,{headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authContext.authState?.token}`,
          },});
          
        const data = response.data.addresses
        setAddress(data)
      }
      catch (error)
      {
        if(authContext.authState?.token)
        {
          if (error.response?.data?.error) {
            toast.error(error.response.data.error);
          } else {
            toast.error(error.message);
          }
        }
        
      }
    }
    setIsLoading(true)
    getMyTasks()
    getMyAddress()
    setIsLoading(false)
  },[authContext.authState?.token])
    return ( 
    <div className='w-full flex flex-col justify-center items-center mt-8'>
        <ToastContainer />
        <div className='flex flex-col justify-center items-center '>
            <Image src={preview} alt="user image" width={120}  height={120} className="object-cover overflow-hidden aspect-square rounded-full" />
            <div                 onClick={handleDivClick} className='hover:cursor-pointer rounded-full border-[1.5px] border-[#27419E] p-2 w-fit self-end relative bottom-8 bg-white'>
                <Image src={edit} alt='edit image' width={15}  className=''/>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                onChange={handleFileChange} 
            />
        </div>
        <h3 className='text-[28px] font-bold text-[#27419E]'>{profileUser.firstName}  {profileUser.lastName}</h3>
        <h2 className="text-green-600">{profileUser.taskers[0].amount} DA </h2>
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
        <textarea  onChange={(e)=>{setDescription(e.target.value)}} value={description} placeholder='Description' rows={4} cols={10} className='mt-6 rounded-md w-[520px] py-3 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl'/>

        {!isLoading ? <div className='w-[520px] text-center'>
            <h3 className='text-lg mt-6 font-semibold'>Manage Your Addresses</h3>
            {address.map((addr, index) => (
                <div key={index} className="flex gap-2 justify-between mb-4 w-[520px]">
                  <select
                    name="wilaya"
                    value={addr.wilaya}
                    onChange={(e) =>
                      handleAddressChange(index, "wilaya", e.target.value)
                    }
                    className="mt-6 w-56 rounded-[60px]  py-3 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
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
                    className="mt-6 w-56 rounded-[60px]  py-3 border-[3.5px] border-MyGrey bg-[#D9D9D91A] bg-opacity-25 px-6 placeholder:text-Grey placeholder:font-semibold placeholder:text-xl"
                    value={addr.commune}
                    onChange={(e) =>
                      handleAddressChange(index, "commune", e.target.value)
                    }
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

                  <button className='mt-6 font-bold text-[20px] text-red-600' onClick={() => handleDeleteAddress(index)}>X</button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddAddress}
                className=" bg-[#27419E] self-start ml-1 mt-3 text-white py-2 px-4 hover:bg-blue-950 rounded mb-4"
              >
                Add Address
              </button>
        </div>  : <h3> Loading ...</h3>}

        <button onClick={handleUpdate }className='w-[350px] mx-auto bg-[#27419E] p-2 rounded-xl text-white text-semibold text-[18px] my-6 hover:bg-blue-950 '>
            Update
        </button>

        

        <div className='w-full px-32'>
          <h3 className="text-[#27419E] font-bold text-[48px] mt-20">Manage Your Tasks</h3>
          <p className="text-md mt-2">Here you can showcase your previous tasks..</p>
          {!isLoading ?
          <div className="grid grid-cols-4 gap-8 w-full mt-16 mb-6">
          {tasks ?
          (tasks.map(elem=>{
              return <OfferCard key={elem.id} offer={elem} />
            })) : (<h3 className=" text-center  text-[28px] ">No Element Founded</h3>)
          }
              <Link href="/offers/add" className="w-[250px] h-[250px]  rounded-xl border-[1px] border-[#CBCBCB] hover:bg-slate-200 hover:cursor-pointer hover:opacity-80 flex flex-col justify-center items-center">
                  <h3 className="text-[#CBCBCB] font-bold text-[36px] ">+</h3>                
              </Link>
          </div> : <h3> loading ... </h3>}
        </div>

        
        

    </div> );
}

export default EditProfile;