const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { UPLOAD_PATH, PORT } = require("./src/configs");
const morgan = require("morgan");
const prisma = require("./src/models/prismaClient.js");
const path = require("path");
const authRouter = require("./src/routes/auth.route.js");
const categoriesRouter = require("./src/routes/categories.route.js");
const tasksRouter = require("./src/routes/tasks.route.js");
const worksRouter = require("./src/routes/works.route.js");
const reviewsRouter = require("./src/routes/reviews.route.js");
const usersRouter = require("./src/routes/users.route.js");

const uploadsPath = path.join(__dirname, UPLOAD_PATH);
app.use('/uploads', express.static(uploadsPath));

//global middlewares
app.use(cors());
app.use(
  morgan("dev", {
    skip: (req, _) => req.path === "/health",
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", async (req, res) => {
  return res.send("Welcome to jobFinder API");
});

//routes

app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories",categoriesRouter)
app.use("/api/tasks",tasksRouter)
app.use("/api/reviews",reviewsRouter)
app.use("/api/works",worksRouter)


//health check route (used by docker compose)
app.get("/health", (req, res) => res.send("OK"));


//global error handler
app.use(async (err, req, res, next) => {
  if (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//don't start server when testing
if (process.env.NODE_ENV !== "test") {
  const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
}


//get all offers 
// get offers by page 
//get offer details by id with his reviews/user did the reviews
// filter offer by category,wilaya,commune,maxPrice

// create new chat 
// get my chats 
// get  chat messages by chatId


//get profile info by Id (with the authorizations )
//update profile

module.exports = app;
