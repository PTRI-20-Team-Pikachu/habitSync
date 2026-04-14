import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser'
import userRouter from "./routers/userRouter.ts"

const __dirname = import.meta.dirname;
const PORT = 3434;
const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
  }))
  app.use(cookieParser())
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.resolve(__dirname, '../client/dist'))); 

  app.use('/user', userRouter)
  app.use('/test', userRouter)

  //global error handler
  app.use( (err, req, res, next) => { // question for APC 
    const defaultError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500, 
      message: {err: 'Error'}
    }
    const errorObj = Object.assign({}, defaultError, err);
    console.log(errorObj.log) 
    return res.status(errorObj.status).json(errorObj.message)
   });
  
  app.listen(PORT, () => { 
    console.log(`Listening on port ${PORT}...`); 
  });
  
  export default app;