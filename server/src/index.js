import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToMongoDB from "./db/connect.js";
import router from "./routes/index.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

try {
  const result = await connectToMongoDB();
  console.log(result);
} catch (err) {
  console.error(err);
}

app.use("/api", router);

app.listen(port, async () => {
  try {
    console.log(`Server is listening on port ${port}.`);
  } catch (err) {
    console.error(err.message);
  }
});
