const express = require("express");
const jwt = require('jsonwebtoken');  // Add this at the top
const {JWT_SECRET} = require('./config')
const app = express()



function authMiddleware(req, res, next) {
  try {
    // Check if the 'Authorization' header is present and valid

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(403)
        .json({ error: "Missing or invalid authorization token" });
    }

    // Extract the JWT from the header
    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("Token verified")

    req.userId = decoded.userId;

    next();
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Error in jwt authentication from middleware" });
  }

  // Verify the JWT using your own verification logic
  // If the JWT is valid, call next() to continue processing the request
  // If the JWT is invalid, return an error response
  // Example:
  // jwt.verify(token, "your-secret-key", (err, decoded) => {
  //     if (err) {
  //         return res.status(403).json({ error: "Invalid or expired JWT" });
  //     }
  //     req.user = decoded;
  //     next();
  // });
}


module.exports = {
  authMiddleware,
};