import { useGSAP } from "@gsap/react";
import axios from "axios";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

export const CardFunc = ({
  id,
  title,
  rating,
  description,
  poster,
  handlePop,
  genre,
  type,
  updatefunc
}) => {
  const [descriptionToggle, setDescriptionToggle] = useState(false);
  const CardRef = useRef();
  useGSAP(() => {
    gsap.to(CardRef.current, {
      duration: 1,
      ease: "power1.inOut",
    });
  });

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(
        import.meta.env.VITE_URL + `content/${id}`
      );
      if (response.status == 200) {
        alert("deleted successfully");
      }
      console.log(response);
    } catch (error) {
      alert("failed to delete");
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-2" ref={CardRef}>
        {!descriptionToggle ? (
          <div
            onClick={(e) => {
              e.preventDefault();
              setDescriptionToggle(true);
            }}
            className="hover:bg-white cursor-pointer hover:text-black h-100 w-58 bg-yellow-500 rounded-xl z-1 border-1 border-yellow-500"
          >
            <img
              className="z-[-10] h-92 w-60 rounded-xl hover:scale-102 duration-300 bg-contain "
              src={poster}
              alt={title}
            />
            <h3 className="font-bold">{title}</h3>
          </div>
        ) : (
          <div
            onClick={(e) => {
              e.preventDefault();
              setDescriptionToggle(false);
            }}
            ref={CardRef}
            className="relative bg-[#fbfafb] cursor-pointer p-2 text-black h-100 w-58 rounded-xl z-1 border-1 border-yellow-500"
          >
            <h3 className="mb-5 flex items-center justify-center font-bold">
              {title}(
              <span className="flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  className="ipc-icon ipc-icon--star sc-d1a56ede-4 jYTGdj"
                  viewBox="0 0 24 24"
                  fill="#f4c418"
                  role="presentation"
                >
                  <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"></path>
                </svg>
                {rating}
              </span>
              )
            </h3>
            <p className="font-normal text-sm">{description}</p>
            <button
              onClick={async(e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to delete this content?")) {
                  let response  = await handleDelete(id);
                  let {update, setUpdate} = updatefunc
                 setUpdate(update?false:true)
                }
              }}
              className="absolute cursor-pointer w-20 mx-1 border-1 right-2 bottom-2 rounded-sm hover:bg-black hover:text-[#fbfafb]"
            >
              Delete
            </button>{" "}
            <button
              onClick={(e) => {
                e.preventDefault();
                handlePop(id, title, rating, description, poster, genre, type);
              }}
              className="absolute cursor-pointer w-20 mx-1 border-1 left-2 bottom-2 rounded-sm hover:bg-black hover:text-[#fbfafb]"
            >
              Edit
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const LandingPage = ({ data, handlePop ,updatefunc}) => {
  const typeOptions = ["Game", "Anime", "Movie", "Webseries", "Anime Movie"];
  return (
    <div className="h-max w-full p-4">
      {typeOptions.map((Element, indx) => (
        <div key={indx} className="mt-5">
          <h1 className="text-4xl text-start font-bold">
            {Element == "Webseries" ? "Webseries" : Element + "s"}
          </h1>
          <div
            key={indx}
            className="px-4 flex overflow-auto gap-5 justify-start "
          >
            {data
              .filter((ele) => ele.type == Element.toLowerCase())
              .map((ele) => (
                <CardFunc
                  handlePop={handlePop}
                  id={ele._id}
                  key={ele._id}
                  title={ele.title}
                  rating={ele.rating}
                  poster={ele.poster}
                  description={ele.description}
                  genre={ele.genre}
                  type={ele.type}
                  updatefunc={updatefunc}
                />
              ))}
          </div>
        </div>
      ))}
      <span
        onClick={(e) => {
          e.preventDefault();
          handlePop(e);
        }}
        className="bg-yellow-500 cursor-pointer hover:scale-115  h-15 w-15 rounded-full fixed right-10 bottom-10 flex justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#fff"
        >
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
      </span>
    </div>
  );
};

export default LandingPage;
