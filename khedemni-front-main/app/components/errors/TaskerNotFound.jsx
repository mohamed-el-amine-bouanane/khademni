// components/TaskerNotFound.js
const TaskerNotFound = () => {
    return (
      <div className="px-20 py-20">
        <div className="bg-red-100 bg-opacity-20 px-8 py-4">
          <h3 className="text-red-600 text-[28px] font-bold">Tasker Not Found</h3>
          <p className="mt-4 font-bold text-[18px] text-red-600">
            The tasker you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  };
  
  export default TaskerNotFound;
  