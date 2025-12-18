import connectDb from "./Db/db.js"
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from "./Routes/lmsRoutes.js"

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()
connectDb();

// middlewares
app.use(cors());
app.use(express.json())

// routes
app.use('/lms', router)
app.use("/api/happy", (req, res) => {
   res.status(200).json({
    message: "i have enjoyed with css students"
   })
})

// error handling middleware
app.use((err, req, res, next) => {
  console.error(`${new Date().toISOString()} Error: ${err.stack}`);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
   console.log(`app is listening on port ${PORT}`);
});
