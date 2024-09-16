const express = require("express");

const app = express();
const port = 8080;

const router = express.Router();

// Route for "/"
router.get("/", (req, res) => {
  console.log("Hello??");
//   return res.status(200).send("Welcome in my world");
    return res.status(200).json({
        staus:"sucess",
        data:{
            message:"hello",
        }
    })
});

// Route for "/wel"
router.get("/wel", (req, res) => {
  console.log("Hello??");
  return res.status(200).send("Welcome to the /wel route");
});

// Route for "/wel"
router.get("/blogs", (req, res) => {
    console.log("Hello??");
    // return res.status(200).send("Welcome to the /wel route");
    return res.status(400).json({
        status:"fail",
        data:[{name:"1",message:"ok"},{name:"2",message:"done"},]
    })
  });


app.use(router);

// Middleware for handling all other routes
app.use("*", (req, res) => {
  console.log("Route not found");
  return res.status(404).send("Route does not exist!!!!");
});

app.listen(port, () => {
  console.log("Server is running on port", port);
});
