const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var cors = require("cors");

const { checkUser, requireAuth } = require("./middleware/authMiddleware");
require("dotenv").config({ path: "./config/.env" });

require("./config/db");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:4200", credentials: true }));

const userRoutes = require("./routes/user.route");
const authRoutes = require("./routes/auth.route");

app.use(cookieParser());

app.use("*", checkUser);

app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", requireAuth, userRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port 5050`);
});
