import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dbConnection from "./config/dbConnection.js"
import {config} from "dotenv"
import userRoute from "./routes/user.route.js"
import hotelRoute from "./routes/hotel.route.js"
import roomRoute from "./routes/room.route.js"
import cookieParser from "cookie-parser"
import morgan from "morgan"
config();
const app = express()
const PORT = 3001 || process.env.PORT

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(cors({
    origin:process.env.FRONTENED_URL,
    credentials:true
}))

app.use(cookieParser())
app.use(morgan("dev"))

app.use("/api/v1/users",userRoute);
app.use("/api/v1/hotels",hotelRoute);
app.use("/api/v1/rooms",roomRoute);

app.listen(PORT,()=>{
    dbConnection();
    console.log(`Server is running in the port ${PORT}`);
})