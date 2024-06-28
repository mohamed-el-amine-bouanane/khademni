"use client"
import userImg from '@/public/chat/user.png'
import Message from "@/app/components/Chat/Message";
import SendMessage from "@/app/components/Chat/sendMessage";
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import api from '@/app/utils/api';
import { BACKEND_URL } from '@/app/constants';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
  } from "@/components/ui/alert-dialog";
import Link from 'next/link.js';

const Messagerie = ({setCurrentChat,currentChat,authContext,work,contacts,setContacts}) => {

    const [Err,setErr]= useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [messages , setMessages] = useState([])
    const [status , setStatus] =useState("created")
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [reviewErr , setReviewErr] =useState(null)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 1, ...newMessage },
        ]);
      };
    const onReviewSubmit =async()=>{
    try {
      const response = await api.post(
        "api/works/"+currentChat+"/workreviews/",
        { rating, comment },
        {
          headers: {
            Authorization: `Bearer ${authContext.authState?.token}`,
          },
        }
      );
      
    } catch (error) {
      console.error("Error submitting review:", error);
      setErr("Failed to submit review.");
    }
    setIsDialogOpen(false);
    }
    useEffect(()=>{
        const fetchData=async()=>{    
            try {
                setStatus(work.status)
                setIsLoading(true)
                setErr(null)
                const response = await api.get("/api/works/"+currentChat,{headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authContext.authState?.token}`,
                  },});
                const data = response.data
                setMessages(data)
                setIsLoading(false)

              } catch (error) {
                console.log(error);
                if (error.response?.data?.error) {
                    setErr(error.response.data.error);
                } else {
                    setErr(error.message);
                }
                setIsLoading(false)
            }
    }
    
        fetchData()
    
    },[currentChat])



    const ChangeStatus=async(newStatus)=>{    
        try {
            
            setErr(null)
            const response = await api.put("/api/works/"+currentChat,{status:newStatus},{headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authContext.authState?.token}`,
              },});
            const data = response.data

            setContacts(prevContacts => {
                return prevContacts.map(contact => {
                  if (contact.id === currentChat) {
                    return { ...contact, status: data.data.status };
                  }
                  return contact;
                });
              });
            setStatus( data.data.status)

          } catch (error) {
            if (error.response?.data?.error) {
                setErr(error.response.data.error);
            } else {
                setErr(error.message);
            }
        }
}
    const handleApprove=()=>{
        ChangeStatus("approved")
        setIsDialogOpen(true)
    }
    const handleFinish =()=>{
        ChangeStatus("finished")
    }
    const handleCancel = ()=>{
        ChangeStatus("canceled")
    }

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollRef = useRef(null);

    // Function to scroll to the bottom
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };
    return ( 
    <div>
        {(currentChat==0) ? <h3 className='w-full h-[600px] text-center '>Please Select a contact to send messages</h3> :(!isLoading && !Err )&&
        <div>
            <div className='w-full px-10 flex justify-between items-center'>
                <Link href={work?.tasker?.User?.id?"/users/"+work?.tasker?.User?.id:"#"} className="flex justify-start items-start gap-2 pt-6 ">
                    <Image src={(work?.tasker?.profilePicture) ? (BACKEND_URL+"/uploads/pictures/" + work?.tasker?.profilePicture) :userImg} alt="user image" width={65}  height={65} className="object-cover overflow-hidden aspect-square rounded-full" />
                    <div className="pt-1">
                        <h3 className="text-[#0C1D4A] font-bold">{(work?.tasker?.User?.firstName)? work.tasker?.User?.firstName : work.client?.User?.firstName}</h3>
                        <p className="text-[#6F6F6F] text-xs mt-1">Task : {work.category.name}  </p>
                    </div>
                </Link>
                <div className='flex justify-start items-center gap-3'>
                    <h3 className='text-lg font-bold'> Work Status : </h3>   
                    <h4 className={`text-lg font-semibold ${status === 'canceled' ? 'text-red-600' : status === 'approved' ? 'text-green-600' : 'text-blue-600'}`}>{status}</h4>

                </div>
            </div>
            <div className='flex justify-end items-center mr-10 gap-4'>
                {(authContext.authState.user.role=="client" && status=="finished") && <button onClick={handleApprove} className='bg-green-600 text-white w-24 font-semibold py-2 rounded-md hover:bg-green-800'>Approve</button>}
                {(authContext.authState.user.role=="tasker" && status=="started") && <button onClick={handleFinish} className='bg-blue-600 text-white w-24 font-semibold py-2 rounded-md hover:bg-blue-800'>Finish</button> }
                {((status =="finished" && authContext.authState.user.role=="client" ) || (status=="started") ) && <button onClick={handleCancel} className='bg-red-600 text-white w-24 font-semibold py-2 rounded-md hover:bg-red-800'>Cancel</button> }
            </div>
            
            
            <div className="flex flex-col justify-start w-full items-start p-12 gap-6 h-[450px] overflow-auto" ref={scrollRef}>
                
                {
                    messages.map(e=>{
                        return (<Message is_sender={e.is_sender} message={e.content} key={e.id} />)
                    })
                }
            </div>
            <SendMessage   disabled={status === "canceled" || status === "approved"}  SetErr={setErr} authContext={authContext}  addMessage={addMessage} currentChat={currentChat}  setCurrentChat={setCurrentChat} contacts={contacts} setContacts={setContacts}  work={work} setStatus={setStatus}/> 
            </div> } 
            {(!Err && isLoading)&& <h3 className="absolute top-1/2 text-center left-[65%]">Loading ... </h3>}
    {(!isLoading && Err &&(currentChat !=0)) && <h3 className="absolute text-red-600 top-1/2 left-[60%] font-bold text-[36px]">{Err}</h3> }
    
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogContent className=" p-0">
            <AlertDialogHeader>
              <AlertDialogDescription>
                <div
                className="flex flex-col border gap-4 p-6 bg-white shadow-md rounded-lg w-full"
                >
                    <h2 className="text-2xl font-semibold text-secondaryColor">
                        Add your own review
                    </h2>
                    <label className="flex flex-col">
                        <span className="text-mainColor font-semibold mb-2">Rating:</span>
                        <input
                        type="number"
                        value={rating}
                        onChange={(e)=>{setRating(e.target.value)}}
                        min="0"
                        max="5"
                        required
                        className="p-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-mainColor"
                        />
                    </label>
                    <label className="flex flex-col">
                        <span className="text-mainColor font-semibold mb-2">Comment:</span>
                        <textarea
                        value={comment}
                        onChange={(e)=>{setComment(e.target.value)}}
                        required
                        rows={5}
                        className="p-2 border text-black resize-none border-gray-300 rounded h-24 focus:outline-none focus:ring-2 focus:ring-mainColor"
                        />
                    </label>
                    {reviewErr && (
                        <h3 className="text-[18px] text-red-600 font-bold w-full text-center mt-2">
                        {reviewErr}
                        </h3>
                    )}
                    <div className="flex justify-between">
                        <button
                        type="button"
                        onClick={()=>{setIsDialogOpen(false)}}
                        className="bg-gray-500 w-fit text-white py-2 px-4 font-semibold rounded hover:bg-gray-600 transition-colors duration-300"
                        >
                        Cancel
                        </button>
                        <button
                        type="submit"
                        onClick={onReviewSubmit}

                        className="bg-mainColor w-fit text-white py-2 px-4 font-semibold rounded hover:bg-secondaryColor transition-colors duration-300"
                        >
                        Submit Review
                        </button>
                    </div>
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
    </div> );
}
 
export default Messagerie;