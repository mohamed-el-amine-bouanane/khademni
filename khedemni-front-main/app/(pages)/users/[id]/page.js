import EditProfile from "@/app/components/User/EditProfile";
import EditProfileClient from "@/app/components/User/EditProfileClient";
import TaskerNotFound from "@/app/components/errors/TaskerNotFound.jsx";
import { BACKEND_URL } from "@/app/constants/index.js";
import { getSession } from "@/app/utils/actions.js";
import api from "@/app/utils/api.js";
import { average } from "@/app/utils/lib.js";
import Image from "next/image.js";
import Link from "next/link.js";

const Profile = async ({ params }) => {
  const { id } = params;
  const session = await getSession();
  let profileUser;

  try {
    let url;
    if (session?.user?.role === "client" && parseInt(id) === session?.user?.id) {
      url = "api/users/client/";

    } else {
      url = `api/users/user/${id}`;

    }
    profileUser = await api.get(url, {
      headers: {
        Authorization: `Bearer ${session?.token}`,
      },
    });
  } catch (error) {
    if (error?.response?.status === 404) {
      return TaskerNotFound();
    } else {
      console.log(error);
    }
  }
  if (parseInt(id) === session?.user?.id) {
    if (session?.user?.role === "tasker") {
      return <EditProfile profileUser={profileUser.data.user} />;
    } else {
      return <EditProfileClient profileUser={profileUser.data} />;
    }
  }
  if (!profileUser?.data?.user?.taskers?.length) {
    return TaskerNotFound();
  }

  const user = profileUser?.data?.user;
  console.log(user.taskers[0].Task.filter((task) => (task.ratingAverage>0) ));
  return (
    <div className="px-20 py-20">
      <div className="flex p-4 justify-center gap-10">
        <div className="w-fit ">
          <div className=" w-[500px]  flex flex-col items-center justify-center">
            <div className="bg-white w-full flex justify-between items-center gap-10 rounded-lg border  px-12 py-5 border-[#27419E]">
              <Image
                src={
                  BACKEND_URL +
                  "/uploads/pictures/" +
                  user.taskers[0].profilePicture
                }
                alt="user image"
                width={120}
                height={120}
                className="object-cover aspect-square rounded-full"
              />

              <div>
                <h4 className="text-[#27419E] text-[24px] font-bold text-nowrap">
                  {user.firstName + " " + user.lastName}
                </h4>
                <div className="text-[#FFA500] mt-2 text-[20px]">
                  ⭐{" "}
                  {average(
                    user.taskers[0].Task.filter((task) => (task.ratingAverage>0) ).map((task) => task.ratingAverage)
                  )}
                </div>
                <div className="text-[#27419E] mt-2">
                  {JSON.stringify(user.taskers[0]._count.works)} Tasks réalisées
                </div>
              </div>
            </div>
            <div className="mt-4 bg-white flex  flex-col justify-start items-start gap-3 rounded-lg border  w-full px-6 py-5 border-[#27419E]">
              <h5 className="font-bold text-xl">À propos de moi</h5>
              <p className="ml-3">{user.taskers[0].description}</p>
            </div>
            <div className="mt-4 bg-white w-full  flex-col justify-start items-start gap-10 rounded-lg border  px-6 py-5 border-[#27419E]">
              <h5 className="font-bold text-xl">Mes compétences</h5>
              <ul className="list-disc mt-2 ml-8">
                {user.taskers[0].categories.map((category) => (
                  <li key={category.id}>{category.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          {user.taskers[0].Task.map((task) => (
            <div
              key={task.id}
              className=" relative border h-fit w-[800px] p-10   border-[#27419E] rounded-lg   "
            >
              <Link
                href={"/offers/" + task.id}
                className="absolute top-10 right-10 rounded-3xl font-bold   bg-[#27419E] text-white px-6 py-2.5 "
              >
                Selectionner
              </Link>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold">
                    {task.category.name} for {task.price}DA
                  </h2>

                  <ul className="list-disc list-inside ml-4 text-sm  mt-2">
                    <li className="text-sm ">
                      {parseFloat(task.ratingAverage).toFixed(1) +
                        " " +
                        "(" +
                        task.reviewsCount +
                        " avis)"}
                    </li>
                    <li>
                      Missions de {Math.floor(1 + Math.random() * 3)} h minimum
                    </li>
                    <li>Véhicules: Vélo, moto, Voiture</li>
                    <li>Outils Je ne dispose pas d'outil spécial</li>
                  </ul>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">Compétences et expérience</h3>
                <p className="text-md ml-4  mt-2">{task.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
