import express, {Request} from 'express'
import {blogsRouter} from "./routes/blogsRouter";
import {postRouter} from "./routes/postRouter";
import {delControllers} from "./controller/delControllers";
import {delRouter} from "./routes/delRouter";
import {runDb} from "./repositories/db";
import * as dotenv from "dotenv";
// import {getName} from "./sorting";
import {blogsRepository} from "./repositories/blogsRepository";
import {blogsService} from "./service/blogsService";
import {blogsControllers} from "./controller/blogsControllers";
import {OutputBlogsDbType} from "./types/blogsTypes";
dotenv.config()

export const app = express()

app.use (express.json())

const port = process.env.PORT || 5002

app.use("/api",blogsRouter,postRouter)
app.use('/api',delRouter) // почему начал рушаться на blogName; BlogName.name

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Server stared on port ${port}`)
})}
//start app
startApp()
// let users = [
//     {id: "12", name: "ignat", age: 20},
//     {id: "13", name: "misha", age: 30},
//     {id: "14", name: "pasha", age: 10},
//     {id: "15", name: "maga", age: 30},
//     {id: "16", name: "artem", age: 20},
//     {id: "17", name: "artem", age: 20},
// ]
// console.log(getName(users,
//     [
//         {searchNameTerm: 'name', direction: 'asc'},
//         {searchNameTerm: 'age', direction: 'desc'}
//     ]))
// export const count = {
//     async get(): Promise<OutputBlogsDbType []> {
//     return await blogsService.findBlogs(1,10)
// }
// }
// console.log(getName(blogsService.findBlogs(1,10),{searchNameTerm: 'name', direction: 'asc'}))
let skip = (Math.ceil(11/5)-1)*5
// console.log(skip)

