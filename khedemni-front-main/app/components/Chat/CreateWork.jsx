"use client"
import Image from "next/image";
import send from "@/public/chat/send.png"
import { useState } from "react";
import api from "@/app/utils/api";
import { useRouter } from "next/navigation";
const CreateWork = ({offer,authContext,setError}) => {
    const router = useRouter()
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleClick(e);
        }
      };
    const [message , setMessage] =useState("")
    const handleClick = async()=>{
        let newMessage = {}
        newMessage={
            is_sender : true,
            destinationUserId : offer.taskerId,
            content : message,
            categoryId :offer.categoryId,
        }
                
        try{
            const response = await api.post("/api/works/messages/",newMessage ,{headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authContext.authState?.token}`,
              },});
              
            const data = response.data 
            setMessage("");  
            router.push("/chat?elem="+data.data.workId)
        }
        catch (error)
        {
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError(error.message);
            }
        }
         
    }
    return ( 
    <div className="w-full pl-16 pr-6 mb-6 flex justify-start items-center">
        <input value={message} onChange={(e)=>{setMessage(e.target.value)}}         onKeyDown={handleKeyDown}  type="text"  placeholder="Type your message..." className="border-[1px] border-blackz shadow-inner w-full p-2 py-4 rounded-lg bg-[#FBFBFB] pr-12"/>    
        <button onClick={handleClick} className="relative right-12 hover:bg-[#27419E] p-2 rounded-xl hover:bg-opacity-20">
            <Image src={send} alt="send message" width={25}/>
        </button>
    </div> );
}
 
export default CreateWork;