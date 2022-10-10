import express from 'express'
import {blogsRouter} from "./routes/blogsRouter";
import {postRouter} from "./routes/postRouter";
import {delRouter} from "./routes/delRouter";
import {usersRouter} from "./routes/usersRouter";
import {runDb} from "./repositories/db";
import * as dotenv from "dotenv";
import {authRouter} from "./routes/authRouter";
import {commentsRouter} from "./routes/commentsRouter";
dotenv.config()

export const app = express()

app.use (express.json())

const port = process.env.PORT || 5002

app.use("/api",blogsRouter,postRouter,delRouter,usersRouter,authRouter,commentsRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server stared on port ${port}`)
})}
//start app
startApp()


