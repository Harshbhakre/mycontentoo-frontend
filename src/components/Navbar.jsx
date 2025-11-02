import React, { createContext, useState } from "react";
import AddContentPage from "./AddContentPage";
import { Link } from "react-router-dom";

const Navbar = ({ handlePop,setsearchedItem }) => {
  return (
    // <div className="absolute w-full top-0">

    <div className="flex justify-center">
      <div className="bg-[#1A1A1D] h-12 flex items-center px-4 justify-between w-full">
        <div className="flex items-center">
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
        <h1 className="text-white font-semibold">myContentList</h1>
          </div>
        <div className="flex justify-between gap-x-3 text-[0.95rem] w-max">
          <span><input onChange={(e)=>{e.preventDefault();setsearchedItem(e.target.value)}} type="text" placeholder="movie name...." className="pl-2 text-black bg-amber-50 rounded-lg w-10 sm:w-50" name="" id="" />{" "}
          </span>
          <Link className="hover:font-bold" to="/">Home</Link>
          <Link className="hover:font-bold" to="/genre">Genre</Link>
          <a
            onClick={(e) => {
              e.preventDefault();
              handlePop(e);
            }}
            href="#"
            >
            Add new
          </a>
        </div>
      </div>
    </div>
            // </div>
  );
};

export default Navbar;
