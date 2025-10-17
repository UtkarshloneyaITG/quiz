import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUser, getUserDetailsById } from "../servics/api";
import { ImagesUrls, Qoutes } from "../servics/ImagesUrls.jsx";
import Loading from "../sharedComponents/Loding.jsx";
function UserDetail() {
  const [arrHistory, setArrHistory] = useState([]);
  const [crrUer, setCrrUser] = useState(null);
  const { userId } = useParams();
  console.log(userId);

  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserDetailsById(userId);
      console.log("userData", userData);
      setCrrUser(userData.user);

      console.log("myuser", userData.user);
      setArrHistory(userData.user.scoreHistory);
    };
    getUser();
  }, []);

  if (!crrUer) {
    return <Loading />;
  }

  return (
    <div className="h-screen  bg-[#26134f] animate-gradient ">
      <div
        className="w-fit flex items-start justify-center gap-1 flex-col text-xl p-4 text-white
       font-extrabold  opacity-90"
      >
        <h1>
          Name : <span>{crrUer.fullName}</span>
        </h1>
        <h1>
          Email : <span>{crrUer.email}</span>
        </h1>
      </div>
    </div>
  );
}
export default UserDetail;
