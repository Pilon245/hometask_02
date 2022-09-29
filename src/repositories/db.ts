import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config()

export type BlogsDbType = {
    // id: string
    name: string
    youtubeUrl: string
}
export type PostDbType = {
    // id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}


const mongoUri = process.env.MONGODB_URL || ""

export const client = new MongoClient(mongoUri);
const db = client.db("network");
export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostDbType>("posts")

export async function runDb(){
    try{
        await client.connect();
        await client.db
        // await client.db("posts").command({ping:1})
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("can't connected to db ")
        await client.close()
    }
}