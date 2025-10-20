const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const User = require("./models/User")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const MONGOURI = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(MONGOURI)
        console.log("Connected to MONGO DB ATLAS");
    } catch (error) {
        console.error(error)
    }
}

connectDB()

app.get("https://mern-back-ytjl.onrender.com/users", async (req,res) => {
    try { 
        const users = await User.find({})
        res.json(users)
    } catch (error) {
        console.error(error)
    }
})


app.post("/register", async (req,res) => {
    const {username, email, password} = req.body;
    console.log(req.body);

    try {
        const newUser = await User.create({username, email, password})
                res.status(201).json({message: "User registered", user: newUser});

    } catch (error) {
                res.status(500).json({message: error.message});

    }
})


const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server is runninng on PORT ${PORT}`);
})