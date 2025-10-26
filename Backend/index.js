import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});
const app= express();
const _dirname = path.resolve();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://jobportal-6-0rk8.onrender.com",        // Use your Render frontend domain!
  "https://pallavicode-17.github.io"              // If you serve from GitHub Pages (without /JobPortal/)
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));




const PORT =process.env.PORT || 3000;
//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*', (_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});
app.listen(PORT ,()=>{
    connectDB();
    console.log(`server running at port ${PORT}`); 
}) 