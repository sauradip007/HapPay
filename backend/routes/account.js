const express = require("express");
const mongoose = require("mongoose");
const app = express();
const {authMiddleware} = require('../middleware');
const { Account, Transaction} = require("../db")
const PORT = 3000;
const router = express.Router();


router.get('/balance', authMiddleware, async(req,res) => {

    try{

        const account = await Account.findOne({userId:req.userId})

        return res.status(200).send({balance:account.balance})
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Could not fetch balance for the user')
    }


})

router.post('/transfer',authMiddleware, async(req,res) => {
    try{
         const session = await mongoose.startSession();
         
    session.startTransaction();
        const {toAccountId , amount } = req.body

    if (!toAccountId || typeof amount !== 'number' || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid input. Provide valid account IDs and a positive transfer amount.' });
    }

    if (req.userId === toAccountId) {
      return res.status(400).json({ error: 'Cannot transfer to the same account.' });
    }


     const fromAccount = await Account.findOne({userId:req.userId});
    const toAccount = await Account.findOne({userId:toAccountId});

    if (!fromAccount) {
      return res.status(404).json({ error: 'Sender account not found.' });
    }

    if (!toAccount) {
      return res.status(404).json({ error: 'Recipient account not found.' });
    }

     if (fromAccount.balance < amount) {
      return res.status(400).json({ error: 'Insufficient balance.' });
    }

    // Perform the transfer

    await Account.updateOne({
        userId: req.userId},
        {
            $inc: {
                balance: -amount
            }
        

    })

        await Account.updateOne(
          {
            userId: toAccountId,
          },
          {
            $inc: {
              balance: amount,
            },
          }
        );

        await new Transaction({
          fromUserId: req.userId,
          toUserId: toAccountId,
          amount: amount,
        }).save();
    // fromAccount.balance -= amount;
    // toAccount.balance += amount;

    // Save the updated balances
    // await fromAccount.save();
    // await toAccount.save()
    
    await session.commitTransaction();




    res.status(200).json({
      message: 'Transfer successful.'
    });

    }catch (error) {
    console.error('Error during transfer:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
})


router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ fromUserId: req.userId }, { toUserId: req.userId }],
    })
      .sort({ timestamp: -1 })
      .populate("fromUserId", "username")
      .populate("toUserId", "username");

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
});
// async function transfer(req) {
//   const session = await mongoose.startSession();

//   try {
//     await session.startTransaction();
//     const { amount, to } = req.body;

//     // Add a small delay to increase the chance of write conflict
//     // await new Promise((resolve) => setTimeout(resolve, Math.random() * 5000));

//     const account = await Account.findOne({ userId: req.userId }).session(
//       session
//     );

//     if (!account || account.balance < amount) {
//       throw new Error("Insufficient balance");
//     }

//     // Simulate a conflicting update by querying the same document
//     await Account.updateOne(
//       { userId: req.userId },
//       { $inc: { balance: -amount } }
//     ).session(session);

//     await Account.updateOne(
//       { userId: to },
//       { $inc: { balance: amount } }
//     ).session(session);

//     await session.commitTransaction();
//     console.log("Transfer successful");
//     return true;
//   } catch (error) {
//     await session.abortTransaction();
//     console.error("Transaction failed:", error.message);
//     throw error;
//   } finally {
//     await session.endSession();
//   }
// }



// async function testConcurrentTransfers() {
//   const transfers = [
//     transfer({
//       userId: "676f0516738fa41a3be02783",
//       body: {
//         to: "676f0583738fa41a3be02788",
//         amount: 10,
//       },
//     }),
//     transfer({
//       userId: "676f0516738fa41a3be02783",
//       body: {
//         to: "676f0583738fa41a3be02788",
//         amount: 300,
//       },
//     }),
//   ];

//   try {
//     // Run transfers concurrently using Promise.all
//     await Promise.all(transfers);
//   } catch (error) {
//     console.error("Transfer error:", error.message);
//   }
// }

// testConcurrentTransfers();


module.exports = router;