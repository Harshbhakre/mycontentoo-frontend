import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../App";
import { CardFunc } from "./LandingPage";

const GenrePage = () => {
  const contextData = useContext(DataContext);

  const [newData, setNewData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (contextData?.newData) {
      setNewData(contextData.newData);
    }
  }, [contextData]);

  function handleFilter(genre) {
    setSelectedGenre(genre);

    if (!genre) {
      // show all items on "reset"
      setNewData(contextData.newData);
      return;
    }

    const filtered = contextData.newData.filter((item) =>
      item.genre.toLowerCase().includes(genre.toLowerCase())
    );

    setNewData(filtered);
  }

  const genresData = [
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
    "Documentary"
  ];

  return (
    <div className="h-max w-full">
      <div
        id="genres"
        className="flex justify-center flex-wrap items-center gap-2 min-h-25 p-2 w-full bg-[#303030]"
      >
        {genresData.map((ele, idx) => (
          <button
            key={idx}
            onClick={() => handleFilter(ele)}
            className={`button p-2 rounded-lg transition-transform duration-200 transform hover:scale-110 hover:text-[#f3bc53]
              ${selectedGenre === ele ? "text-[#f3bc53] font-bold" : ''}`}
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
    </div>
  );
};

export default GenrePage;
