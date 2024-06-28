import Image from "next/image";
import Contact from "./Contact";
import search from "@/public/chat/search.png"
import { useEffect, useState } from "react";
const Contacts = ({contacts,setCurrentChat ,currentChat,setContacts}) => {
    const [text,setText]=useState("")
    const [cache,setCache] =useState(contacts)

    useEffect(()=>{
        setCache(contacts)
    },[contacts])
    const handleChange=(value)=>{
        setText(value)
        if (value !== "") {
            const filteredContacts = contacts.filter((elem) => {
              if (elem.tasker && elem.tasker.User.firstName) {
                return elem.tasker.User.firstName.toLowerCase().includes(value.toLowerCase());
              } else if (elem.client && elem.client.User.firstName) {
                return elem.client.User.firstName.toLowerCase().includes(value.toLowerCase());
              }
              return false;
            });
            // Assuming you want to update the contacts with the filtered results
            setCache(filteredContacts);
        } else {
            // If the input is empty, restore the contacts from cache
            setCache(contacts);
        }

    }
    return ( 
    <div className="w-full flex flex-col justify-center items-start gap-10">
        <div className="pl-6 pr-12 w-full flex justify-center">
            <button className="relative left-8 ">
                <Image src={search} alt="send message" width={20}/>
            </button>
            <input value={text} onChange={(e)=>{handleChange(e.target.value)}} type="text"  placeholder="Serach ..." className="bg-white rounded-full shadow-lg pl-10 px-4 py-3 w-full "/>    
        </div>
        <div className="  w-full h-[500px]  overflow-auto">
            {cache.map(elem=>{
                return (<Contact key={elem.id} contact={elem} setCurrentChat={setCurrentChat} currentChat={currentChat}/>)
            })} 
        </div>
        


    </div> );
}
 
export default Contacts;