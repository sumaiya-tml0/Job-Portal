import "dotenv/config";
import express from "express";
import { prisma } from "../lib/prisma";

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const port = process.env.PORT || 4000;

//routes import
import userRoutes from "../src/routes/userRoutes.js";

//routes declaration
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
