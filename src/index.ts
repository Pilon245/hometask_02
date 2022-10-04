import express from 'express'
import {blogsRouter} from "./routes/blogsRouter";
import {postRouter} from "./routes/postRouter";
import {delRouter} from "./routes/delRouter";
import {usersRouter} from "./routes/usersRouter";
import {runDb} from "./repositories/db";
import * as dotenv from "dotenv";
import {authRouter} from "./routes/authRouter";
dotenv.config()

export const app = express()

app.use (express.json())

const port = process.env.PORT || 5002

app.use("/api",blogsRouter,postRouter,usersRouter,authRouter)
app.use('/api',delRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server stared on port ${port}`)
})}
//start app
startApp()


