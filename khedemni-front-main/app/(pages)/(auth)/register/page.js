import RegisterCard from "@/app/components/Register/RegisterCard";

function BackG(props) {
  return (
    <div className="flex justify-between flex-row-reverse py-20 items-center container px-7">
      <img src="/SignUp/workers2.png" alt="" className="hidden lg:block" />
      <div className="">
        <RegisterCard />
      </div>
    </div>
  );
}

export default BackG;
