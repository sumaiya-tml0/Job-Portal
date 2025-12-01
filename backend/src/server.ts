import "dotenv/config";
import express from 'express';
import { prisma } from "../lib/prisma";

const app = express();
app.use(express.json());
const port = 3000


app.get('/users', async(_, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})