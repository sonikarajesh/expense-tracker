const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/expense_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/UserRoutes"); 

app.get('/', (req, res) => {
  res.send('Welcome to the backend!');
});
const authRoute = require("./routes/auth");

app.use("/api/auth", authRoute); 

app.use("/api/users", userRoute);   

app.listen(5000, () => console.log("Server running on port 5000"));
