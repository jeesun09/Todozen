import express from 'express';
const app = express();
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/index.js';

dotenv.config({ path: './.env'});

const corsOptions = {
  origin: process.env.HOST_URL,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT;
connectDB();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

//route import
import userRouter from './routes/user.routes.js'
import todoRouter from './routes/todo.routes.js'
//route declaration
app.use('/api/user', userRouter)
app.use('/api/todo', todoRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})