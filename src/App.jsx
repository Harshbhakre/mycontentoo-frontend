import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AddContentPage from "./components/AddContentPage";
import axios from "axios";
import GenrePage from "./components/GenrePage";
import { Route, Routes } from "react-router-dom";

export let DataContext = createContext()
const App = () => {
   const [addPopup, setAddPopup] = useState(false);
   const [data, setdata] = useState([]);
   const [newData, setnewData] = useState([]);
   const [searchedItem, setsearchedItem] = useState(''); 
   useEffect(() => {
    if(searchedItem.trim().length==0){
      setnewData(data)
    }else{

      let filteredData = data.filter(ele=>ele.title.toLowerCase().includes(searchedItem.trim().toLowerCase()))
      setnewData(filteredData)
    }
   }, [searchedItem]);
   
  useEffect(() => {
    const fetchContent = async () => {
      try {
        let response = await axios.get(
          import.meta.env.VITE_URL,
        );
        if (response) {
          let tempoData = [];
          for (let i in response.data) {
            tempoData.push(response.data[i]);
          }
          setdata(tempoData);
          setnewData(tempoData)
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchContent();
  }, []);
   const handlePop = (e)=>{
    e.preventDefault()
    setAddPopup(addPopup?false:true)
  }
  return (
    <DataContext.Provider value={newData}>
    <div className="duration-300 relative bg-[#0B0B0B] h-max sm:w-full text-white text-center">
      {addPopup && <AddContentPage handlePop={handlePop} />}
      <Navbar handlePop={handlePop} setsearchedItem={setsearchedItem}/>
      <Routes>
        <Route path="/" element={<LandingPage data={newData} handlePop={handlePop}/>} />
        <Route path="/genre" element={<GenrePage />}/>
      </Routes>
    </div>
    </DataContext.Provider>


  
  );
};

export default App;
