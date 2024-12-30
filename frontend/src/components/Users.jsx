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

function User({user})
{
    const colorClass = getRandomColor();
    return (
        <div className="flex justify-center">
          <div className={`rounded-full h-12 w-12 ${colorClass} flex justify-center mt-1 mr-2`}>
            <div className="flex flex-col justify-center h-full text-xl">
              {user.firstName[0].toUpperCase()}
            </div>
          </div>
          <div className="text-black-300 text-xl font-semibold mt-3">
            {user.firstName} {user.lastName}
          </div>
        </div>
    )
}
function Users() {

const navigate = useNavigate()
const [users, setUsers] = useState([]);

const [filter, setFilter] = useState("")
useEffect(() => {

   const email = localStorage.getItem("username")
//    console.log(email)
   axios
     .get(
       `https://happay-backend.onrender.com/api/v1/user/bulk?filter=${filter}`
     )
     .then((response) => {
       const filteredUsers = response.data.users.filter(
         (user) => user.username !== email
       );
       setUsers(filteredUsers);
     });
  
},[filter])

  return (
    <>
      <div className="font-medium h-full ml-3 mt-2">Users</div>
      <div className="ml-2 mr-2 my-2">
        <input
          onChange = {(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
        ></input>
      </div>
   
        {users.map((user)=> {
            return (
              <div key={user._id} className="flex justify-between">
                <div>
                  <User user={user} />
                </div>
                <div>
                  <Button
                    label="Send Money"
                    onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
                  />
                </div>
              </div>
            );
        })}

    </>

  );
}

export default Users