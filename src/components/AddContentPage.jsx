import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { DataContext } from "../App";

const AddContentPage = ({ handlePop,dataUpdate ,setDataUpdate,updatefunc}) => {
  const popdiv = useRef(null);
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [rating, setRating] = useState(0.0);
  const [posterLink, setPosterLink] = useState("");
  const [description, setDescription] = useState("");


useEffect(() => {
  if(dataUpdate.title){
    setDescription(dataUpdate.description)
    setGenre(dataUpdate.genre)
    setPosterLink(dataUpdate.poster)
    setRating(dataUpdate.rating)
    setTitle(dataUpdate.title)
    setType(dataUpdate.type)
  }else{
    handleStates()
  }

  // setUpdate(update?true:false)
  // console.log(update);
}, []);

const handleStates =()=>{
setDescription("")
    setGenre("")
    setPosterLink("")
    setRating("")
    setTitle("")
    setType("")
}

  const apiPost = async () => {
    if (
      title.length === 0 ||
      genre.length === 0 ||
      posterLink.length === 0 ||
      description.length === 0 ||
      rating>=11 ||
      rating<0
    )
      return alert("Please enter valid data and try again!");

    try {
      setLoading(true);
      let response;
if (dataUpdate.title) {
  response = await axios.put(
    `${import.meta.env.VITE_URL}content/${dataUpdate.id}`,
    { title, genre, rating, poster: posterLink, description, type }
  );
  setDataUpdate(''); 
} else {
  response = await axios.post(
    `${import.meta.env.VITE_URL}content`,
    { title, genre, rating, poster: posterLink, description, type }
  );
}


      if (response.status === 200){
        alert("success!");
        // setUpdate(update?false:true)
        // console.log(update);
      } 
    } catch (error) {
      alert("Failed!");
      console.log(error);
    } finally {
      handleStates()
      handlePop();
      setLoading(false);
      let {update, setUpdate} = updatefunc;
      setUpdate(update?false:true)
    }
  };

  return (
    <div
      ref={popdiv}
      className="absolute w-full h-screen flex items-center justify-center z-[50] backdrop-blur-sm"
    >
      <div className="relative w-[400px] p-6 rounded-2xl bg-[#0B0B0B] border border-gray-700 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={handlePop}
          className="absolute top-3 right-3 hover:rotate-90 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#fff"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>

        <h1 className="text-3xl font-semibold mb-4">Add new content</h1>

        <form
          className="flex flex-col gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            apiPost();
          }}
        >
          <label>
            Type <br />
            <select
              onChange={(e) => setType(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border border-gray-700"
            >
              <option value="">Select type</option>
              <option value="movie">Movie</option>
              <option value="game">Game</option>
              <option value="webseries">Webseries</option>
              <option value="anime">Anime</option>
              <option value="anime movie">Anime Movie</option>
            </select>
          </label>

          <label>
            Content Name <br />
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="w-full p-2 rounded bg-black text-white border border-gray-700"
              placeholder="Enter movie name"
            />
          </label>

          <label>
            Rating <br />
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border border-gray-700"
              placeholder="Enter rating"
            />
          </label>

          <label>
            Genre <br />
            <input
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border border-gray-700"
              placeholder="drama, Action......."
            />
          </label>

          <label>
            Poster Link <br />
            <input
            value={posterLink}
              onChange={(e) => setPosterLink(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border border-gray-700"
              placeholder="Paste link here"
            />
          </label>

          <label>
            Description <br />
            <textarea
            value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-black text-white border border-gray-700 h-24"
              placeholder="Write your thoughts..."
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded flex justify-center items-center gap-2 transition-all"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin w-5 h-5" /> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContentPage;
