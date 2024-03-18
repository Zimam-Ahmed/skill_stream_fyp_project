import path  from 'path';
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import classRoutes from './routes/classRoutes.js'
import cookieParser from "cookie-parser";
import classWorkRoutes from './routes/classWorkRoutes.js';
import attendenceRoutes from './routes/attendenceRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';


connectDB();
 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

app.use(cookieParser());
 

app.use('/api/users', userRoutes);

app.use('/api/classroom', classRoutes);
 
app.use('/api/classwork', classWorkRoutes); 

app.use('/api/attendence', attendenceRoutes);

app.use('/api/submission', submissionRoutes);
 
 


if(process.env.NODE_ENV === 'production'){
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html')));
}else{
  app.get('/', (req, res) => res.send ('server is ready'));    
}

 
app.use(notFound);
app.use(errorHandler);   
app.listen(port, () => console.log(`server listen at port ${port}`));
