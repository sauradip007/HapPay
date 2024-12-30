
import React, { useState } from "react";
import axios from "axios";
import Heading from "./Heading"; // Assuming you have a Heading component
import Subheading from "./Subheading"; // Assuming you have a Subheading component
import Inputbox from "./Inputbox"; // Assuming you have an Inputbox component
import Button from "./Button"; // Assuming you have a Button component
import Appbar from "./Appbar";

function UpdateMoney() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const username = localStorage.getItem("username") || ""

   const onClickHandler = async () => {

     try {
       const updates = {};
       if (firstName) updates.firstName = firstName;
       if (lastName) updates.lastName = lastName;
       if (email) updates.email = email;
       if (password) updates.password = password;

       if (Object.keys(updates).length === 0) {
         setErrorMessage("Please update at least one field before submitting.");
         return;
       }

       const response = await axios.put(
         "http://localhost:3000/api/v1/user",
         updates,
         {
           headers: {
             Authorization: "Bearer " + localStorage.getItem("tokenin"),
           },
         }
       );

       if (response.status === 200) {
         setSuccessMessage("Profile updated successfully!");
         setErrorMessage("");
       }
     } catch (error) {
       console.error("Error updating profile:", error);
       setErrorMessage(
         error.response?.data?.message ||
           "Failed to update profile. Please try again."
       );
       setSuccessMessage("");
     }
   };

  return (
    <div>
      <Appbar username={username}/>
      <div className="max-w-md mx-auto bg-gray-50 p-6 mt-5 rounded-lg shadow-md">
        <Heading label="Update your profile" />
        <Subheading label="Enter your updated profile details here" />
        <Inputbox
          onChange={(e) => setFirstName(e.target.value)}
          label="Updated first name"
          value={firstName}
        />
        <Inputbox
          onChange={(e) => setLastName(e.target.value)}
          label="Updated last name"
          value={lastName}
        />
        <Inputbox
          onChange={(e) => setEmail(e.target.value)}
          label="Updated email"
          placeholder="mycompany@gmail.com"
          value={email}
        />
        <Inputbox
          onChange={(e) => setPassword(e.target.value)}
          label="Updated password"
          type="password"
          value={password}
        />

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mt-2">{successMessage}</p>
        )}

        <Button label="Update profile" onClick={onClickHandler} />
      </div>
    </div>
  );
}

export default UpdateMoney;