const express = require("express");
const app = express();
const PORT = 3000;

// Single routing
const router = express.Router();
const userRouter = require('./user')
const accountRouter = require('./account')

router.use('/user', userRouter)
router.use('/account', accountRouter)

// router.get("/", function (req, res, next) {
//   console.log("Router Working");
//   res.end();
// });

// app.use(router);

// app.listen(PORT, function (err) {
//   if (err) console.log(err);
//   console.log("index router listening on PORT", PORT);
// });


module.exports = router;