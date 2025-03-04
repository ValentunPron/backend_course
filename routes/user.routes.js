import { Router } from "express";

const userRouter = Router(); 

userRouter.get('/users', (req, res) => res.send({title: 'Get All users'}));

userRouter.get('/:id', (req, res) => res.send({title: 'Get user'}));

userRouter.post('/', (req, res) => res.send({title: 'Post user'}));

userRouter.put('/:id', (req, res) => res.send({title: 'Update user'}));

userRouter.delete('/:id', (req, res) => res.delete({title: 'Delete user'}));

export default userRouter;