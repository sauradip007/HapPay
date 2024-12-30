import {React, useState} from 'react'
import Heading from './Heading';
import Subheading from './Subheading';
import Inputbox from './Inputbox';
import Button from './Button';
import BottomWarning from './BottomWarning';
import { useNavigate } from 'react-router';
import axios from 'axios';
function Signup() {
    const navigate = useNavigate()
async function onClickHandler(firstName, lastName,username,password) {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      });

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token)
        navigate(`/signin`);
      }

    } catch (error) {
      // Handle error responses
      if (error.response) {
        if (error.response.status === 411) {
          setErrorMessage("User already exists. Please try signing in.");
        } else if (error.response.status === 500) {
          setErrorMessage("An internal server error occurred. Please try again later.");
        } else {
          setErrorMessage("Failed to sign up. Please check your details and try again.");
        }
      } else {
        setErrorMessage("Network error. Please check your connection and try again.");
      }
    }
    }

    // useEffect(()=>{
    //     fetch("http://localhost:3000/api/v1/user/signup")
    //     .then(async (response) => {
    //         const res = await response.json()
    //     })
    // })

    const[firstName,setFirstName] = useState("")
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Error handling
    const [errorMessage, setErrorMessage] = useState("");


  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 mt-5 rounded-lg shadow-md">
      <Heading label="Sign Up" />
      <Subheading label="Enter your details here" />
      <Inputbox onChange={(e) => setFirstName(e.target.value) } label="First Name" placeholder="John" />
      <Inputbox onChange = {(e) => setLastName(e.target.value) }label="Last Name" placeholder="Doe" />
      <Inputbox onChange = {(e) => setEmail(e.target.value) } label="Email" placeholder="mycompany@gmail.com" />
      <Inputbox onChange = {(e) => setPassword(e.target.value) }label="Password" type="password" />

        {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
      <Button label="Sign Up" onClick={() => onClickHandler(firstName,lastName,email,password)}/>
      <BottomWarning
        label="Already have an Account?"
        link="Sign In"
        route="signin"
      />
    </div>
  );
}

export default Signup