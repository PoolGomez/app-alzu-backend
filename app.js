const express = require("express");
const connectDB = require("./config/database");
const config = require("./config/config");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

const PORT = config.port;
connectDB();

//Middlewares
app.use(cors({
    credentials : true,
    origin : ['http://localhost:5173']
}));
app.use(express.json()); // parse incoming request in json format
app.use(cookieParser());

//Root EndPoint
app.get("/",(req,res)=>{
    res.json({message: "Hello from Alzu backend"});
})

// Other Endpoints
app.use("/api/user", require("./routes/userRoute"));
app.use("/api/table", require("./routes/tableRoute"));
app.use("/api/company", require("./routes/companyRoute"));
app.use("/api/room", require("./routes/roomRoute"));
app.use("/api/role", require("./routes/roleRoute"));

app.use("/api/user-company", require("./routes/userCompanyRoute"));

//Global Error Handler
app.use(globalErrorHandler);

//Server
app.listen(PORT, ()=>{
    console.log(`POS Server is listening on port ${PORT}`);
})