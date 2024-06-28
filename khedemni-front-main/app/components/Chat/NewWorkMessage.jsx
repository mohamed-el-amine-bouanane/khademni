import CreateWork from "./CreateWork";

const NewWorkMessage = ({offer,authContext,setError}) => {
    return ( 
    <div className="mt-5 w-full " >
        
        <h3 className="mb-6 w-full text-center">Send a message to start a work with the Tasker </h3>
        <CreateWork setError={setError} offer={offer} authContext={authContext} />
    </div> );
}
 
export default NewWorkMessage;