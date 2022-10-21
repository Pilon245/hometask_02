import express from 'express'
import cookieParser from "cookie-parser";
import {runDb} from "./repositories/db";
import * as dotenv from "dotenv";
import {blogsRouter} from "./routes/blogsRouter";
import {postRouter} from "./routes/postRouter";
import {delRouter} from "./routes/delRouter";
import {usersRouter} from "./routes/usersRouter";
import {authRouter} from "./routes/authRouter";
import {commentsRouter} from "./routes/commentsRouter";
import {devicesRouter} from "./routes/devicesRouter";
import cors from 'cors';

dotenv.config()

export const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.set('trust proxy', true)// чтобы получать ip22

const port = process.env.PORT || 5002

app.use("/api",blogsRouter,postRouter,delRouter,usersRouter,authRouter,commentsRouter,devicesRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server stared on port ${port}`)
})}
//start app
startApp()


