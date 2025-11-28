import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ handlePop, setsearchedItem }) => {
  const [userId, setuserId] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    let User = localStorage.getItem("UserId");
    setuserId(User);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="bg-[#1A1A1D] h-12 flex items-center px-4 justify-between w-full max-w-screen-xl">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="22" height="22" fill="#f4c418" viewBox="0 0 24 24">
            <path d="M12 17.27l4.15 2.51c.76.46 1.69-.22 
            1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41
            -1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24
            1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z">
            </path>
          </svg>

          <h1
            onClick={() => (window.location.href = "/")}
            className="text-white font-semibold cursor-pointer text-sm sm:text-base"
          >
            myContentList
          </h1>
        </div>

        {/* Hamburger Button (mobile only) */}
        <button
          className="text-white text-2xl sm:hidden"
          onClick={() => setOpenMenu(!openMenu)}
        >
          ☰
        </button>

        {/* Desktop menu */}
        <div className="hidden sm:flex items-center gap-4 text-[0.95rem]">
          <input
            onChange={(e) => setsearchedItem(e.target.value)}
            type="text"
            placeholder="movie name..."
            className="pl-2 text-black bg-amber-50 rounded-lg w-40 md:w-60 h-7"
          />

          <Link to="/">Home</Link>
          <Link to="/genre">Genre</Link>

          {userId ? (
            <>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  handlePop(e);
                }}
              >
                Add new
              </Link>

              <Link to="/manageaccess">Manage Access</Link>

              <button
                onClick={() => {
                  localStorage.setItem("UserId", "");
                  window.location.href = "/login";
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {openMenu && (
        <div className="sm:hidden bg-[#1A1A1D] text-white w-40 flex flex-col gap-3 px-4  py-4">

          <input
            onChange={(e) => setsearchedItem(e.target.value)}
            type="text"
            placeholder="movie name..."
            className="pl-2 text-black bg-amber-50 rounded-lg h-8"
          />

          <Link onClick={() => setOpenMenu(false)} to="/">
            Home
          </Link>
          <Link onClick={() => setOpenMenu(false)} to="/genre">
            Genre
          </Link>

          {userId ? (
            <>
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  handlePop(e);
                  setOpenMenu(false);
                }}
              >
                Add new
              </Link>

              <Link onClick={() => setOpenMenu(false)} to="/manageaccess">
                Manage Access
              </Link>

              <button
                onClick={() => {
                  localStorage.setItem("UserId", "");
                  window.location.href = "/login";
                }}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <Link onClick={() => setOpenMenu(false)} to="/login">
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
