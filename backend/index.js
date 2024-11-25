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

const app = express();

const _dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
    origin: ["http://localhost:5174", "http://localhost:5173","https://hire-hub-tm68.onrender.com"],
    credentials: true,
};
app.use(cors(corsOptions));


const PORT = process.env.PORT || 3000;



app.use("/api/v1/user",userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);


// app.get("/",(req,res)=>{
//     return res.status(200).json({
//         message: "Server is running",
//         success: true
//     })
// });

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`)
})