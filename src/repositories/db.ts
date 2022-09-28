import {MongoClient} from "mongodb";

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


const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017"

export const client = new MongoClient(mongoUri);
const db = client.db("network");
export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostDbType>("posts")

export async function runDb(){
    try{
        await client.connect();
        await client.db("blogs").command({ping:1}) // что значит эта строка
        await client.db("posts").command({ping:1})
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("can't connected to db ")
        await client.close()
    }
}