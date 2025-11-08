import React, { createContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import AddContentPage from "./components/AddContentPage";
import axios from "axios";
import GenrePage from "./components/GenrePage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

export let DataContext = createContext();
const App = () => {
  const [addPopup, setAddPopup] = useState(false);
  const [update, setUpdate] = useState(true);
  const [data, setdata] = useState([]);
  const [newData, setnewData] = useState([]);
  const [searchedItem, setsearchedItem] = useState("");
  const [dataUpdate, setDataUpdate] = useState();
  useEffect(() => {
    if (searchedItem.trim().length == 0) {
      setnewData(data);
    } else {
      let filteredData = data.filter((ele) =>
        ele.title.toLowerCase().includes(searchedItem.trim().toLowerCase())
      );
      setnewData(filteredData);
    }
  }, [searchedItem]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let response = await axios.get(import.meta.env.VITE_URL, {
          headers: { userid: localStorage.getItem("userId") },
        });
        if (response) {
          let tempoData = [];
          for (let i in response.data) {
            tempoData.push(response.data[i]);
          }
          setdata(tempoData);
          setnewData(tempoData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchContent();
  }, [update]);
  const handlePop = (id, title, rating, description, poster,genre,type) => {
    setDataUpdate({ id, title, rating, description, poster,genre,type});
    setAddPopup(addPopup ? false : true);
  };

  return (
    <DataContext.Provider value={{ newData, setUpdate, update }}>
      <div className="duration-300 relative bg-[#0B0B0B] h-max sm:w-full text-white text-center">
        {addPopup && <AddContentPage handlePop={handlePop} dataUpdate={dataUpdate?dataUpdate:null} setDataUpdate={setDataUpdate} updatefunc={{update, setUpdate}}/>}
        <Navbar handlePop={handlePop} setsearchedItem={setsearchedItem} />
        <Routes>
          <Route
            path="/"
            element={<LandingPage data={newData} handlePop={handlePop}  updatefunc={{update, setUpdate}} />}
          />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </DataContext.Provider>
  );
};

export default App;
