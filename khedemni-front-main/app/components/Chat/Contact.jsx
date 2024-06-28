import Image from "next/image";
import userImg from '@/public/chat/user.png'
import { BACKEND_URL } from "@/app/constants";

const Contact = ({contact,setCurrentChat,currentChat}) => {
    return ( 
    <div onClick={()=>{setCurrentChat(contact.id)}}   className={`flex mt-6 justify-between items-center px-12 w-full hover:opacity-80 hover:cursor-pointer ${currentChat === contact.id ? "font-black" : ""}`}    >
        <div className="flex justify-start items-start gap-2  ">
            <Image src={(contact?.tasker?.profilePicture) ? (BACKEND_URL+"/uploads/pictures/" + contact?.tasker?.profilePicture) :userImg} alt="user image" width={55}  height={55} className="object-cover overflow-hidden aspect-square rounded-full" />
            <div className="pt-1">
                <h3 className={"text-[#0C1D4A] "}>{(contact?.tasker?.User?.firstName)? contact.tasker?.User?.firstName : contact.client?.User?.firstName}</h3>
                <p className={"text-[#6F6F6F] text-xs mt-1 " }>Task : {contact.category.name} </p>
            </div>
        </div> 
        <p className={"text-blue-800 opacity-40 " }>{contact.status}</p>
    </div>
    );
}
 
export default Contact;