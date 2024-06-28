import LoginCard from "@/app/components/Login/LoginCard.js";

function BackG(props) {
  return (
    <div className="py-32 flex justify-between items-center container px-7">
      <img src="/SignUp/workers.png" alt="" className="hidden lg:block" />
      <div className="">
        <LoginCard />
      </div>
    </div>
  );
}

export default BackG;
