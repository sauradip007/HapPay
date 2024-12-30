import {React, useState} from "react";
import Heading from "./Heading";
import Subheading from "./Subheading";
import Inputbox from "./Inputbox";
import Button from "./Button";
import BottomWarning from "./BottomWarning";
import { useNavigate } from "react-router";
import axios from "axios";

function Signin() {
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [errorMessage, setErrorMessage] = useState("");

    async function onClickHandler(email, password){
       try {
         const response = await axios.post(
           "http://localhost:3000/api/v1/user/signin",
           {
             username: email,
             password: password,
           }
         );

         if (response.status === 201) {
            // const user = email.split("@")[0];
           localStorage.setItem("tokenin", response.data.token);
           localStorage.setItem("username", email)
           localStorage.setItem("userid", response.data.userId);
           

           navigate('/landing')
        //    navigate(`/dashboard`);
         }
       } catch (error) {
         // Display error messages based on response status
         if (error.response) {
           if (error.response.status === 401) {
             setErrorMessage("Invalid email or password. Please try again.");
           } else if (error.response.status === 400) {
             setErrorMessage("Bad request. Please check your inputs.");
           } else if (error.response.status === 500) {
             setErrorMessage(
               "An internal server error occurred. Please try again later."
             );
           } else {
             setErrorMessage("An unknown error occurred. Please try again.");
           }
         } else {
           setErrorMessage("Network error. Please check your connection.");
         }
       }

    }
  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 mt-5 rounded-lg shadow-md">
      <Heading label="Sign In" />
      <Subheading label="Enter your credentials to access your account" />
      <Inputbox onChange = {(e) => setEmail(e.target.value)} label="Email" placeholder="mycompany@gmail.com" />
      <Inputbox onChange = {(e) => setPassword(e.target.value)} label="Password" type="password" />
              {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      <Button onClick = {() => onClickHandler(email,password)} label="Sign In" />
      <BottomWarning label='Dont have an account?' link = 'Sign Up' route='signup' />
    </div>
  );
}

export default Signin