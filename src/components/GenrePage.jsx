import React, { useContext, useState } from "react";
import {DataContext} from '../App'
import { CardFunc } from "./LandingPage";

const GenrePage = () => {
  let contextData = useContext(DataContext)
  const [firstRender, setfirstRender] = useState(true)
  const [newData, setnewData] = useState([])
 function handleFilter(e, ele) {
  e?.preventDefault();
  if (firstRender) {
    setnewData(contextData);
    setfirstRender(false);
    return; 
  } 
  ele = ele.toLowerCase()
  const filtered = contextData.filter(item => item.genre.toLowerCase().includes(ele));
  setnewData(filtered);
}

if (firstRender) handleFilter();
  
  const [genresData, setgenresData] = useState([
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Romance",
    "Horror",
    "Thriller",
    "Sci-Fi",
    "Fantasy",
    "Mystery",
    "Crime",
    "Animation",
    "Supernatural",
    "Slice of Life",
    "Sports",
    "Psychological",
    "Historical",
    "War",
    "Music",
    "Documentary",
  ]);
  return <div className="h-max w-full">
    <div id="geners" className="flex justify-center flex-wrap items-center gap-2 min-h-25 p-2 w-full bg-[#303030]">
  {genresData.map((ele, idx) => (
    <button
      key={idx} 
      onClick={(e)=>{handleFilter(e,ele)}}
      className="button p-2 transition-transform duration-200 transform hover:scale-120 hover:text-[#f3bc53] cursor-pointer rounded-lg"
      style={{ transformOrigin: "center" }}
      type="button"
    >
      {ele}
    </button>
  ))}
</div>
  <div className="p-10 flex flex-wrap h-max gap-10 justify-center">
        {newData.map((ele, idx) => (
          <CardFunc
            key={idx}
            title={ele.title}
            rating={ele.rating}
            poster={ele.poster}
            description={ele.description}
          />
        ))}
      </div>
  </div>;
};

export default GenrePage;
