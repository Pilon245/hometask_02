import express, {Request} from 'express'
import {blogsRouter} from "./routes/blogsRouter";
import {postRouter} from "./routes/postRouter";
import {delControllers} from "./controller/delControllers";
import {delRouter} from "./routes/delRouter";

const app = express()

app.use (express.json())

const port = process.env.PORT || 5002

app.use("/api",blogsRouter,postRouter)
app.use('/api',delRouter) // почему начал рушаться на blogName; BlogName.name

app.listen(port, () => {
    console.log(`Server stared on port ${port}`)
})