
const { JWT_SECRET } = require("../config");

const express = require("express");
const { z } = require("zod");
const {User} = require('../db')
const {Account} = require('../db')
const { authMiddleware } = require('../middleware')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const PORT = 3000;

// Single routing
const router = express.Router();

// router.get("/", function (req, res, next) {
//   console.log("Router Working");
//   res.end();
// });
app.use(express.json());

// app.use(authMiddleware);
const signupSchema = z.object({
  username: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string(),
  lastName: z.string().optional(),
});
 


router.post("/signup", async (req, res) => {
  try {
    // Validate the input
    const validatedData = signupSchema.parse(req.body);

    // Check if the email already exists
    const existingUser = await User.findOne({
      username: validatedData.username,
    });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // Create a new user
    const newUser = new User({
      username: validatedData.username,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName || "", // Default to empty string if undefined
      password: hashedPassword,
    });

    await newUser.save();

    // Generate a random balance
    const randomBalance = Math.floor(Math.random() * 10000) + 1;

    // Create an account for the user
    const newAccount = new Account({
      userId: newUser._id,
      balance: randomBalance,
    });

    await newAccount.save();

    // Generate JWT token
    const userId = newUser._id;
    const token = jwt.sign({ userId }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token: token,
    });
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }

    // Log the error for debugging (not exposed to the client)
    console.error("Error during signup:", error);

    // Handle JWT or database errors more specifically if needed
    if (error.name === "JsonWebTokenError") {
      return res.status(500).json({ error: "Error generating token" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});


const signinBody = z.object({
    username: z.string().email(),
	password: z.string().min(6, "Password must be at least 6 characters")
})
router.post('/signin',async(req,res)=>{
    try{

        // const { username, password } = req.body

        const validatedData = signinBody.parse(req.body);

        const existingUser = await User.findOne({
          username: validatedData.username
        });

                if (!existingUser) {
                  return res.status(401).json({ error: "Invalid credentials" });
                }


        const isPasswordValid = await bcrypt.compare(
            validatedData.password, 
            existingUser.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }


            let token;
            if (existingUser) {
                // localStorage.setItem('firstid',existingUser._id)
               token = jwt.sign({userId:existingUser._id.toString()},
                JWT_SECRET
              );
            }

             return  res.status(201).json({
                token: token,
                userId: existingUser._id.toString()
              });
             
            // }


    } catch(error) {

    if(error instanceof z.ZodError){
        return res.status(400).json({ error: error.errors });
      } 
    
    return res.status(500).json({ error: 'Internal server error' });



    }

})

router.put('/', authMiddleware, async(req, res) => {

    const userId = req.userId;
    
    if (!userId) {
        return res.status(400).json({ error: 'UserId not found' });
    }
    try{
        // const { firstName, lastName, password } = req.body;
        //  const updates = {};
        // if (firstName) updates.firstName = firstName;
        // if (lastName) updates.lastName = lastName;
        // if (password) updates.password = password; // Add hashing if necessary

        // const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

        const updatedUser = await User.updateOne({ _id: req.userId }, req.body);

        if (!updatedUser) {
            return res.status(404).json({ message: 'UserId not found and details could not be updated.' });
        }


         res.status(200).json({ message: 'User updated successfully.', user: updatedUser });



    }catch(error){
                console.error("Error updating user:", error.message);
                res.status(500).json({ message: "Internal server error." });
    }
})
// app.listen(PORT, function (err) {
//   if (err) console.log(err);
//   console.log("User router working", PORT);
// });
router.get('/bulk', async(req,res) => {

   try {
     const { filter,page = 1, limit = 10 } = req.query; // Fetch the filter from query parameters
     const skip = (page - 1) * limit;
     let query = {}
    //  let users;
    //  if (!filter) {
    //    // Fetch all records when no filter is provided

       
    //    users = await User.find({});
    //  } else {
    //    // Fetch records matching the filter
    //    users = await User.find({
    //      $or: [
    //        { firstName: { $regex: filter, $options: "i" } },
    //        { lastName: { $regex: filter, $options: "i" } },
    //      ],
    //    });
    //  }


    if (filter) {
      query = {
        $or: [
          { firstName: { $regex: filter, $options: "i" } },
          { lastName: { $regex: filter, $options: "i" } },
        ],
      };
    }

    // Fetch users with pagination
    const users = await User.find(query).skip(skip).limit(parseInt(limit));

    // Fetch total count for pagination metadata
    const totalUsers = await User.countDocuments(query);

     if (!users || users.length === 0) {
       return res.status(404).json({ message: "No users found." });
     }

     // Map the users to include only necessary fields
    //  res.status(200).json({
    //    users: users.map((user) => ({
    //      _id: user._id,
    //      username: user.username,
    //      firstName: user.firstName,
    //      lastName: user.lastName,
    //    })),
    //  });

        res.status(200).json({
          users: users.map((user) => ({
            _id: user._id,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
          })),
          totalUsers, // Total number of users matching the query
          currentPage: parseInt(page), // Current page
          totalPages: Math.ceil(totalUsers / limit), // Total pages
        });
   } catch (error) {
     console.error("Error fetching users:", error.message);
     res.status(500).json({ message: "Internal server error." });
   }

})
module.exports = router;
