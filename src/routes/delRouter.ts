import {Router} from "express";
import {delControllers} from "../controller/delControllers";

export const delRouter = Router ({})

delRouter.delete('/testing/all-data',delControllers.deleteAllData)