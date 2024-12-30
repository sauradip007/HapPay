import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";

function getRandomColor() {
  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-orange-400",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function Appbar({ username }) {
  const navigate = useNavigate();
  const colorClass = getRandomColor();
  const [showMenu, setShowMenu] = useState(false);


    const handleLogout = () => {
      localStorage.removeItem("tokenin");
      localStorage.removeItem("username");
      navigate("/signin");
    };

  return (
    <div className="relative">
      <div className="shadow h-14 flex justify-between bg-white">
        <div className="flex flex-col justify-center h-full ml-4 text-black-500 text-xl font-bold">
          HapPay
        </div>
        <div className="flex items-center">
          <div className="flex flex-col justify-center h-full mr-4">
            Hello, {username.split("@")[0]}
          </div>
          <div
            className={`rounded-full h-12 w-12 ${colorClass} flex items-center justify-center mr-2`}
          >
            <div className="text-xl font-bold text-white">
              {username[0].toUpperCase()}
            </div>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full mr-4"
          >
            {showMenu ? (
              <ChevronUp className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {showMenu && (
        <div className="absolute right-4 top-16 w-48 bg-white rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              navigate("/dashboard");
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 rounded-t-md"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
            Dashboard
          </button>
          <button
            onClick={() => {
              navigate("/landing");
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 rounded-b-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
              />
            </svg>
            Landing
          </button>
          <button
            onClick={() => {
              navigate("/update");
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 rounded-b-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Update Profile
          </button>
          <button
            onClick={() => {
              navigate("/charts");
              setShowMenu(false);
            }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 rounded-b-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
              />
            </svg>
            Analytics
          </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2 text-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25a2.25 2.25 0 0 0-2.25-2.25h-3a2.25 2.25 0 0 0-2.25 2.25V9m-2.25 4.5L12 18m0 0l3.75-4.5M12 18V9"
              />
            </svg>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Appbar;