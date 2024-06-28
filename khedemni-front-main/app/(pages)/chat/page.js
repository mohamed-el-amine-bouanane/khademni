"use client"
import Contacts from "@/app/components/Chat/Contacts";
import Messagerie from "@/app/components/Chat/Messagerie";
import { AuthContext } from "@/app/context/Auth";
import api from "@/app/utils/api";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

const Chat = () => {
    const {id} = useParams()
    const [err,SetErr] = useState(null)
    const [isLoading , setIsLoading] = useState(true)
    const [contacts,setContacts] = useState([])
    const [currentChat,setCurrentChat] = useState(0) // 0 ne chat selected -1 a new chat before create work
    const [user ,setUser] = useState(null)
    const authContext = useContext(AuthContext);

    const searchParams = useSearchParams()

    useEffect(()=>{
        const selectedElem = searchParams.get('elem')
        
        const fetchData=async()=>{    
            try {
                SetErr(null)
                const userId  = authContext.authState.user.id
                const response = await api.get("/api/works/",{headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authContext.authState?.token}`,
                  },});
                const data = response.data
                if(selectedElem){
                    setCurrentChat(selectedElem)
                }
                else{
                    setCurrentChat(0)
                }
                setContacts(data)
                setIsLoading(false)

              } catch (error) {

                if (error.response?.data?.error) {
                    SetErr(error.response.data.error);
                } else {
                    SetErr(error.message);
                }
                setIsLoading(false)
            }
    }
    if(authContext.authState?.token)
    {
        fetchData()
    }
    },[authContext])
    return (
    <div>
        {(!isLoading &&!err) ?    <div className="w-full flex justify-center items-start h-fit pt-10">
                <div className="w-1/3 border-t-2 border-[#656565] pt-10">
                    <Contacts contacts={contacts} setCurrentChat={setCurrentChat} currentChat={currentChat} setContacts={setContacts} />
                </div>
                <div className="w-2/3 border-l-2 border-[#656565] border-t-2 ">
                    <Messagerie setCurrentChat={setCurrentChat} currentChat={currentChat} contacts={contacts} setContacts={setContacts}  authContext={authContext} work={contacts.find(e=>e.id==currentChat)}/>
                </div>
            </div> : (!err)&& <h3 className="absolute top-1/2 w-full text-center">Loading ... </h3>}
    {(!isLoading && err ) && <h3 className="absolute text-red-600 top-1/2 left-[40%] font-bold text-[36px]">{err}</h3> }
    </div>
     
    );
}
 
export default Chat;