import {Router} from "express";
import {usersControllers} from "../controller/usersControllers";
import {inputBodyValidation} from "../middlewares/inputValidation";
import {authMiddleware} from "../middlewares/authMiddleware";
import {usersValidation} from "../middlewares/bodyValidation";

export const usersRouter = Router({})


usersRouter.get('/users', usersControllers.getUsers.bind(usersControllers))
usersRouter.post('/users',authMiddleware,usersValidation,inputBodyValidation, usersControllers.createUsers.bind(usersControllers))
usersRouter.delete('/users/:id', authMiddleware,usersControllers.deleteUsers.bind(usersControllers))
