import axios from "axios";
import React, { useState } from "react";
import CubeLoader from "./CubeLoader";


const EditRequestPopup = ({requestInfo}) => {
  let {request,setRequest}=requestInfo
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const onSubmit =async()=>{
    setLoading(true)
    try {
      let response = await axios.post(import.meta.env.VITE_URL+"request",{
        msg:msg,
         requestUserID:request.userId,
         contentId:request.id
      })
      alert("request Sent")
      window.location.href="/"
    } catch (error) {
      alert("falied to sent request, please try later")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
     {loading? <div className="h-screen w-full bg-black flex justify-center items-center"><CubeLoader /> </div>:

      <div className="bg-[#0f0f0f] w-[90%] max-w-md p-6 rounded-xl border border-gray-700 shadow-xl">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-white">Request Edit</h2>
          <button onClick={()=>window.location.href="/"} className="text-white text-xl cursor-pointer">✕</button>
        </div>

        {/* Reason Input */}
        <label className="text-gray-300 text-sm">Why do you want to edit?</label>
        <textarea onChange={(e)=>setMsg(e.target.value)}
          className="w-full mt-2 bg-transparent border border-gray-600 rounded-lg p-3 text-gray-200 focus:outline-none focus:border-yellow-400"
          rows="5"
          placeholder="Write your reason..."
        ></textarea>

        {/* Button */}
        <button
          onClick={onSubmit}
          className="w-full mt-5 bg-yellow-500 text-black font-semibold py-2 rounded-lg hover:bg-yellow-600 cursor-pointer"
        >
          Send Request
        </button>
      </div>}
    </div>
  );
};

export default EditRequestPopup;
