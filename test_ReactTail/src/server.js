import express from "express";
import { connect } from "./db.js"; // đường dẫn chính xác tới file db.js
import router from "./routes/Index.js"; // hoặc nơi bạn khai báo routes

const app = express();
app.use(express.json());

// connect MongoDB
connect();

// định tuyến API
app.use("/api", router);

app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port " + process.env.PORT);
});
