const Message = ({is_sender , message}) => {
    return ( 
    <div className={`border-[1px] ${!is_sender ? "border-[#656565] self-start text-black" : "border-[#79869F] bg-[#5040E9] bg-opacity-20 self-end"} rounded-lg p-4 max-w-[45%]`} >
        <p>
           {message}
        </p>
    </div> );
}
 
export default Message;