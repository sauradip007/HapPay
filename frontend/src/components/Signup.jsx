import React, { useState } from "react";
import Heading from "./Heading";
import Subheading from "./Subheading";
import Inputbox from "./Inputbox";
import Button from "./Button";
import BottomWarning from "./BottomWarning";
import Loader from "./Loader";
import { useNavigate } from "react-router";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [loading,setLoading] = useState(false)

  async function onClickHandler() {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://happay-backend.onrender.com/api/v1/user/signup",
        {
          username: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
        }
      );

      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        navigate(`/signin`);
      }
    } catch (error) {
      // Handle error responses
      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          setErrorMessage("User already exists. Please try signing in.");
        } else if (status === 400 && data.error) {
          // Backend Zod validation errors
          const validationErrors = data.error
            .map((err) => err.message)
            .join(" ");
          setErrorMessage(validationErrors || "Invalid input data.");
        } else if (status === 500) {
          setErrorMessage(
            "An internal server error occurred. Please try again later."
          );
        } else {
          setErrorMessage(
            "Failed to sign up. Please check your details and try again."
          );
        }
      } else {
        setErrorMessage(
          "Network error. Please check your connection and try again."
        );
      }
    }finally{
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto bg-gray-50 p-6 mt-5 rounded-lg shadow-md">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Heading label="Sign Up" />
          <Subheading label="Enter your details here" />
          <Inputbox
            onChange={(e) => setFirstName(e.target.value)}
            label="First Name"
            placeholder="John"
          />
          <Inputbox
            onChange={(e) => setLastName(e.target.value)}
            label="Last Name"
            placeholder="Doe"
          />
          <Inputbox
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="mycompany@gmail.com"
          />
          <Inputbox
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            type="password"
          />

          {/* Display error messages */}
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}

          <Button label="Sign Up" onClick={onClickHandler} />
          <BottomWarning
            label="Already have an Account?"
            link="Sign In"
            route="signin"
          />
        </>
      )}
    </div>
  );
}

export default Signup;