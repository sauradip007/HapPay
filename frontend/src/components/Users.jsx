import {React, useState, useEffect} from 'react'
import Inputbox from './Inputbox';
import Button from './Button';
import axios from 'axios';
import { useNavigate } from 'react-router';


function getRandomColor() {
const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-orange-400",
  "bg-teal-400",
  "bg-cyan-400",
  "bg-lime-400",
  "bg-amber-400",
  "bg-rose-400",
  "bg-indigo-400",
];

  return colors[Math.floor(Math.random() * colors.length)];
}

function useDebounce(input, delay)
{

  const[debounce,setDebounce] = useState(input)
  useEffect(()=> {

    const timer = setTimeout(() => {
      setDebounce(input)
    }, delay*1000)

    return () => clearTimeout(timer)
  },[input, delay])

  return debounce
}

function User({user, colorMap})
{
  const colorClass = colorMap[user._id]; // Retrieve color from the color map

  return (
    <div className="flex justify-center">
      <div
        className={`rounded-full h-12 w-12 ${colorClass} flex justify-center mt-1 mr-2`}
      >
        <div className="flex flex-col justify-center h-full text-xl">
          {user.firstName[0].toUpperCase()}
        </div>
      </div>
      <div className="text-black-300 text-xl font-semibold mt-3">
        {user.firstName} {user.lastName}
      </div>
    </div>
  );
}
function Users() {

const navigate = useNavigate()
const [users, setUsers] = useState([]);

const [filter, setFilter] = useState("")
const debounced = useDebounce(filter,1);
const [colorMap, setColorMap] = useState({});
const[page,setPage] = useState(1)
const[totalPages,setTotalPages] = useState(1) 

useEffect(() => {

   const email = localStorage.getItem("username")
//    console.log(email)
   axios
     .get(
       `https://happay-backend.onrender.com/api/v1/user/bulk?filter=${filter}&page=${page}&limit=5`
     )
     .then((response) => {
       //  const filteredUsers = response.data.users.filter(
       //    (user) => user.username !== email
       //  );

       const { users: fetchedUsers, totalPages } = response.data;

       const filteredUsers = fetchedUsers.filter(
         (user) => user.username !== email
       );
       setColorMap((prevMap) => {
         const newMap = { ...prevMap };
         filteredUsers.forEach((user) => {
           if (!newMap[user._id]) {
             newMap[user._id] = getRandomColor();
           }
         });
         return newMap;
       });
       setUsers(filteredUsers);
       setTotalPages(totalPages);
     });
  
},[debounced,page])

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };


  return (
    <>
      <div className="font-medium h-full ml-3 mt-2">Users</div>
      <div className="ml-2 mr-2 my-2">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>

      {users.map((user) => {
        return (
          <div key={user._id} className="flex justify-between">
            <div>
              <User user={user} colorMap={colorMap} />
            </div>
            <div>
              <Button
                label="Send Money"
                onClick={() =>
                  navigate(`/send?id=${user._id}&name=${user.firstName}`)
                }
              />
            </div>
          </div>
        );
      })}

<div className="flex justify-center items-center mt-4">
  <button
    className="px-4 py-2 mx-2 bg-gray-300 rounded"
    disabled={page === 1}
    onClick={handlePreviousPage}
  >
    Previous
  </button>
  <span className="mx-2">Page {page} of {totalPages}</span>
  <button
    className="px-4 py-2 mx-2 bg-gray-300 rounded"
    disabled={page === totalPages}
    onClick={handleNextPage}
  >
    Next
  </button>
</div>
    </>
  );
}

export default Users