import axios from "axios";
import { useEffect, useState } from "react";
import CubeLoader from "./CubeLoader";





const ManageAccess = () => {
  const [loading, setLoading] = useState(false)
  const [requests, setRequests] = useState([]);

    useEffect(() => {
      setLoading(true)
      async function getRequests (){
        try {
    let userId =await localStorage.getItem("UserId")
    let response =  await axios.get(import.meta.env.VITE_URL+`getrequest/${userId}`)
      setRequests(response.data.slice(1));
      
  } catch (error) {
    console.log(error);

  }finally{
    setLoading(false)
  }
  }
  getRequests()
    }, [])

    async function allowAccess(e){
      let requestData = requests[e.target.id]
      let userId = await localStorage.getItem("UserId")
      try {
        let response = await axios.post(import.meta.env.VITE_URL+"allowaccess",{
          contentId:requestData.contentId,
          requestUserId:requestData.requestUserID,
          userId
        })
        console.log(response)
        window.location.href="/manageaccess"
      } catch (error) {
        console.log(response)
      }
    }

    async function removeAccess(e){
      let requestData = requests[e.target.id]     
      let userId = await localStorage.getItem("UserId")
      try {
        let response = await axios.post(import.meta.env.VITE_URL+"removeaccess",{
          contentId:requestData.contentId,
          requestUserId:requestData.requestUserID,
          userId
        })
        console.log(response)
        window.location.href="/manageaccess"
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className="h-screen w-full flex justify-start items-center flex-col">
      {loading && <CubeLoader />}
      {requests.length<1 && (
  <p className="mt-10 text-white text-center">
    No requests found
  </p>
)}

      {requests &&
        requests.map((Element, idx) => (
          <div
            key={idx}
            className="mt-5 p-2 h-20 w-[95%] flex justify-between items-start border-1 border-[#5f5f5f] rounded-sm bg-[#19191a]"
          >
            <div>
              <h1>
                <span className="text-yellow-500 font-semibold">
                  {Element.nameofuser}
                </span>
                 {"  "}request to edit content named: {"  "}
                <span className="text-yellow-500 font-semibold">
                  {Element.contentname}
                </span>
              </h1>
              <p className="text-start">{Element.msg}</p>
            </div>
            <div className="h-full w-50 flex items-center justify-center">
              {!requests[idx].allow && <button id={idx} onClick={(e)=>{allowAccess(e)}} className="cursor-pointer px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                Allow
              </button>}
              <button id={idx} onClick={(e)=>{removeAccess(e)}} className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 ml-2">
                Deny
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ManageAccess;
