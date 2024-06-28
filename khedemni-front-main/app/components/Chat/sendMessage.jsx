"use client"
import Image from "next/image";
import send from "@/public/chat/send.png"
import { useState } from "react";
import api from "@/app/utils/api";
const SendMessage = ({addMessage,disabled,currentChat,setCurrentChat,work,authContext,SetErr,setStatus,contacts,setContacts}) => {
    const [error,setError] = useState(null)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleClick(e);
        }
      };
    const [message , setMessage] =useState("")
    const handleClick = async()=>{
        setError(null)
        let newMessage = {}
        let id 
        if(work.taskerId){
            id= work.taskerId
        }
        else{
            id= work.clientId

        }
        newMessage={
            is_sender : true,
            destinationUserId : id,
            content : message,
            categoryId :work.category.id,
            workId:work.id
        }
                
        try{
            const response = await api.post("/api/works/messages/",newMessage ,{headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authContext.authState?.token}`,
              },});
              
            const data = response.data 
            addMessage(newMessage)
            setStatus(data.data.work.status)
            setContacts(prevContacts => {
                return prevContacts.map(contact => {
                  if (contact.id === data.data.workId) {
                    return { ...contact, status: data.data.work.status };
                  }
                  return contact;
                });
              });
            
            setMessage("");  
            
        }
        catch (error)
        {
            console.log(error);
            if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError(error.message);
            }
        }
         
    }
    return ( 
    <div>
        {disabled && <h3 className="w-full  text-center mb-2 font-semibold">The work is closed you couldn't send any other messages </h3>}
        {error && <h3 className="w-full text-red-600 text-center mb-2 font-semibold">{error}</h3> }
        <div className="w-full pl-16 pr-6 mb-6 flex justify-start items-center">
            <input           disabled={disabled}  value={message} onChange={(e)=>{setMessage(e.target.value)}}         onKeyDown={handleKeyDown}  type="text"  placeholder="Type your message..." className="border-[1px] border-blackz shadow-inner w-full p-2 py-4 rounded-lg bg-[#FBFBFB] pr-12"/>    
            <button disabled={disabled} onClick={handleClick} className="relative right-12 hover:bg-[#27419E] p-2 rounded-xl hover:bg-opacity-20">
                <Image src={send} alt="send message" width={25}/>
            </button>
        </div>
    </div>
     );
}
 
export default SendMessage;