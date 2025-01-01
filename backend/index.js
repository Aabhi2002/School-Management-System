const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const Routes = require("./routes/route.js");

const PORT = process.env.PORT || 5000;

dotenv.config();

// Frontend URL for CORS
const frontendUrl = 'https://school-management-system-ten-drab.vercel.app/';  // Replace with your actual frontend URL

// CORS configuration
app.use(cors({
    origin: frontendUrl,  // Allow your frontend URL only
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
}));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err));

// Routes
app.use('/', Routes);

app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`);
});
