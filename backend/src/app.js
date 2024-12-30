import express from "express";
import cors from "cors";
import cookieparser from 'cookie-parser';
import userRouter from "./routes/user.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cookieparser())

// app.get("/test-env", (req, res) => {
//   res.send("Env working correctly!");
// });


app.use("/api/v1/users", userRouter);

export default app;
