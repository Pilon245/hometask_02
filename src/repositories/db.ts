import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config()
import {BlogsDbType} from "../types/blogsTypes";
import {PostDbType} from "../types/postsTypes";
import {UsersDbType} from "../types/usersTypes";






const mongoUri = process.env.MONGODB_URL || ""

export const client = new MongoClient(mongoUri);
const db = client.db("network");
export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostDbType>("posts")
export const usersCollection = db.collection<UsersDbType>("users")

export async function runDb(){
    try{
        await client.connect();
        await client.db
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("can't connected to db ")
        await client.close()
    }
}