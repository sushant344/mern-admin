require('dotenv').config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./Routes/user");
const contactRouter = require("./Routes/contact");
const serviceRouter = require("./Routes/service");
const adminRouter = require("./Routes/admin-router");
const connectDB = require("./connection");
const errorMiddleware = require('./middlewares/error-middleware');

const app = express();
const PORT = process.env.PORT || 8000;

// cors integration --
const allowedOrigins = [
    "http://localhost:5173",  // Local development
    process.env.Netlify_URI   // Netlify deployment
];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.json())

app.get("/", (req, res)=>{
    res.status(200).json({msg: "Welcome to home"})
})


app.use("/api", userRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);
app.use("/api/admin", adminRouter);
app.use(errorMiddleware);

connectDB().then(()=>{
    app.listen(PORT, ()=> `Server started at ${PORT}`)
})