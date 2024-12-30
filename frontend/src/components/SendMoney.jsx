import { React, useState } from 'react'
import Heading from './Heading';
import Inputbox from './Inputbox';
import Button from './Button';
import { useLocation } from "react-router-dom";
import Appbar  from './Appbar';
import axios from 'axios';
function SendMoney() {
  const location = useLocation(); // Get access to the current location object
  const queryParams = new URLSearchParams(location.search); // Parse the query string

  async function onClickHandler(id, amount) {
    
        setSuccess("");
        setError("");
    try {
         const response = await axios.post(
           "https://happay-backend.onrender.com/api/v1/account/transfer",
           {
             toAccountId: id,
             amount: amount,
           },
           {
             headers: {
               Authorization: "Bearer " + localStorage.getItem("tokenin"),
             },
           }
         );

         if (response.status === 200) {
           setSuccess('Transfer Successful')
         } 
        } catch (error) {

                  if (error.response) {
                    setError(
                      error.response.data.error ||
                        "Something went wrong. Please try again."
                    );
                  } else {
                    setError(
                      "Unable to connect to the server. Please try again later."
                    );
                  }
        }

  }

  const id = queryParams.get("id");
  const name = queryParams.get("name");


  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [amount, setAmount] = useState(0)

  return (
    <div>
      <Appbar username={localStorage.getItem("username") || "User"} />
      <div className="max-w-md mx-auto bg-gray-50 p-6 mt-5 rounded-lg shadow-md">
        <div className="text-center">
          <Heading label="Send Money" />
        </div>
        <div className="flex mt-12">
          <div className="rounded-full h-12 w-12 bg-lime-500 flex justify-center mt-1 mr-2">
            <div className="flex flex-col justify-center h-full text-xl">
              {name[0].toUpperCase()}
            </div>
          </div>
          <div className="text-black-500 text-xl font-bold mt-3">{name}</div>
        </div>
        <div className="text-black-500 text-medium font-semibold mt-3">
          Amount (in Rs)
        </div>
        <div>
          <Inputbox
            type="number"
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter Amount"
          />
        </div>
        <div>
          <button
            onClick={() => onClickHandler(id, amount)}
            type="button"
            className=" w-full text-white bg-lime-500 hover:bg-lime-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-4"
          >
            Send Money
          </button>
          {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
        {/* <Subheading label="Enter your credentials to access your account" />
      <Inputbox label="Email" placeholder="mycompany@gmail.com" />
      <Inputbox label="Password" />

      <Button label="Sign In" />
      <BottomWarning
        label="Dont have an account?"
        link="Sign Up"
        route="signup"
      /> */}
      </div>
    </div>
  );
}

export default SendMoney