import express from 'express'

const userRouter = express.Router()

userRouter.get('/', (req, res, next) => {
    res.send ('Login Page')
})

//auth controller? 



export default userRouter;

