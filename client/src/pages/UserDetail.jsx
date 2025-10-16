import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllUser, getUserDetailsById } from "../servics/api";
import {ImagesUrls , Qoutes }  from "../servics/ImagesUrls.jsx";
function UserDetail() {
const arr = [
  { score: 87, attempts: 6, correct: 4, submittedAt: "2025-10-12T14:23:45.000Z" },
  { score: 42, attempts: 8, correct: 6, submittedAt: "2025-09-30T09:14:22.000Z" },
  { score: 95, attempts: 5, correct: 5, submittedAt: "2025-10-16T02:58:10.000Z" },
  { score: 12, attempts: 3, correct: 1, submittedAt: "2025-10-03T19:46:33.000Z" }
];

  const [arrHistory, setArrHistory] = useState([]);
  const [Arr,setArr] = useState([]);
  const [crrUer, setCrrUser] = useState({});
  // const [timeUpdated,setUpdated] = useState([]);
  const [openIndexes, setOpenIndexes] = useState([]);
  const { userId } = useParams();
  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserDetailsById(userId);
      console.log("userData", userData);
      setCrrUser(userData.user);
      setArr(arr);
      console.log("myuser", userData.user);
      setArrHistory(userData.user.scoreHistory);
    }
    getUser();
  }, []);
  console.log(arrHistory);

  // useEffect(() => {
  //   const getDashboard = async () => {
  //     const userInfo = await getAllUser()
  //   setData(userData.userData);
  //   setScore(userData.userData.scoreHistory);
  // };
  //   getDashboard();
  // }, []);
  console.log("array", crrUer);
  const toggleOpen = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };
  return (
  <div className="bg-gradient-to-r from-gray-950 via-gray-800 to-gray-700 animate-gradient ">
  <div className="relative height-[24rem] m-t-[6rem]">
          <ImagesUrls />
  </div>
  <div className="text-xl text-amber-100 font-bold font-sans absolute top-[14rem] left-[30rem] z-10000 w-[30rem]">
    <Qoutes />
  </div>
  <div className="w-[14rem] h-[14rem] absolute bottom-[10rem] left-[5rem]">
    <img src="/images/Png Of React-web.png" alt="User-logo" className="w-full h-full"/>
  </div>
  <div></div>
      <div className="w-fit flex items-start justify-center gap-1 flex-col text-xl p-4 text-amber-100
       font-extrabold  opacity-90 absolute bottom-[11rem] right-[10rem]">
        <h1>Name  : <span>{crrUer.fullName}</span></h1>
        <h1>Email : <span>{crrUer.email}</span></h1>
        <h1>Intertwined : <span>{crrUer.updatedAt}</span></h1>
    </div>
    <div className="flex w-[96%] ml-[2%] items-center justify-start flex-col bg-gradient-to-tr from-blue-700 mt-20 pt-4 rounded-2xl
     via-indigo-700 to-purple-700">
      <div className="grid grid-cols-3 font-bold text-2xl text-white w-full">

        <p className="pl-[50px] text-left">Title</p>

        <p className="text-center">Score</p>

        <p className="pr-[50px] text-right">Detail</p>
 </div>
        
        {Arr.length !== 0 ? <div className="w-full min-h-[60vh] flex items-center justify-center 
        font-extrabold text-4xl text-amber-100 ">
No History ! Please Give Quiz Right Now !</div>:<h1>Hello</h1>}
          </div>
          </div>
)}
export default UserDetail;