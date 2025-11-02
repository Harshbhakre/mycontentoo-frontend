import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

const AddContentPage = ({ handlePop }) => {
  const popdiv = useRef(null);
  const [type, settype] = useState("");
  const [title, settitle] = useState("");
  const [genre, setgenre] = useState("");
  const [rating, setrating] = useState(0.0);
  const [posterLink, setposterLink] = useState("");
  const [description, setdescription] = useState("");

  const apiPost = async () => {
    console.log("uploading...");
    if(title.length==0 || genre.length ==0 || posterLink.length==0 || description.length==0) return alert("please Enter valid Data... and try again")
    try {
      let response = await axios.post(
        import.meta.env.VITE_URL+"content",
        {
          title: title,
          genre: genre,
          rating: rating,
          poster: posterLink,
          description: description,
          type: type,
        }
      );
      if (response.status == 200) {
        alert("posted successfully");
      }
      console.log(response);
    } catch (error) {
      alert("failed ");
      console.log(error);
      
    }
  };

  return (
    <>
      <div
        ref={popdiv}
        className="absolute w-full h-screen flex items-center justify-center z-[50] backdrop-blur-sm"
      >
        <div className="h-155 w-max p-5 rounded-lg bg-[#0B0B0B] z-[50] border-2 top-1 relative">
          <button
            onClick={(e) => {
              handlePop(e);
            }}
            className="absolute top-2 right-2 hover:rotate-90 cursor-pointer"
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
          <h1 className="text-4xl text-start font-light">Add new content</h1>
          <form className="text-start flex flex-col gap-2 items-start mt-2">
            <label>
              Type <br />
              <select
                onChange={(e) => settype(e.target.value)}
                className="w-80 border  border-[#c1c1c1] pl-2"
              >
                <option className="text-black" value="">
                  Select type
                </option>
                <option className="text-black" value="movie">
                  Movie
                </option>
                <option className="text-black" value="webseries">
                  Webseries
                </option>
                <option className="text-black" value="anime">
                  Anime
                </option>
                <option className="text-black" value="anime movie">
                  Anime Movie
                </option>
              </select>
            </label>
            <label htmlFor="">
              {" "}
              Content Name <br />
              <input
                onChange={(e) => {
                  settitle(e.target.value);
                }}
                className="w-80  border-1 border-[#c1c1c1] pl-2"
                type="text"
                name=""
                id=""
                placeholder="Enter movie name"
              />
            </label>
            <label htmlFor="">
              {" "}
              Rating <br />
              <input
                onChange={(e) => {
                  setrating(e.target.value);
                }}
                className="w-80  border-1 border-[#c1c1c1] pl-2"
                type="number"
                name=""
                id=""
                placeholder="Enter Rating"
              />
            </label>
            {/* <label>
              Genre <br />
              <select
                multiple
                onChange={(e) =>
                  setgenre([...e.target.selectedOptions].map((o) => o.value))
                }
                className="w-80 border border-[#c1c1c1] pl-2"
              >
                {[
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
                ].map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </label> */}
            <label htmlFor="">
              {" "}
              Genre <br />{" "}
              <input
                onChange={(e) => {
                  setgenre(e.target.value);
                }}
                className="w-80 border-1 border-[#c1c1c1] pl-2"
                type="text"
                name=""
                id=""
                placeholder="drama,Action,"
              />{" "}
            </label>
            <label htmlFor="">
              {" "}
              Poster Link <br />
              <input
                onChange={(e) => {
                  setposterLink(e.target.value);
                }}
                className="w-80  border-1 border-[#c1c1c1] pl-2"
                type="text"
                name=""
                id=""
                placeholder="Paste link here"
              />
            </label>
            <label htmlFor="">
              {" "}
              Description <br />
              <textarea
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                className="w-80 border border-[#c1c1c1] pl-2"
                rows="5"
                placeholder="write your thoughts about movie."
              />
            </label>
            
            <button
              onClick={(e) => {
                e.preventDefault();
                apiPost(e);
                handlePop(e);
              }}
              className="w-80 bg-amber-50 text-black cursor-pointer border-1 border-amber-50 hover:scale-105"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddContentPage;
