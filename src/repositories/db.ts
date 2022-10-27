import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config()
import {BlogsDbType} from "../types/blogsTypes";
import {PostDbType} from "../types/postsTypes";
import {UserAccountDBType, UsersDbType} from "../types/usersTypes";
import {CommentsDbType} from "../types/commentsTypes";
import {SessionDBType} from "../types/sessionTypes";
import {blockIpDBType, connectionsDBType} from "../types/ipTypes";
import {TokenDBType} from "../types/tokenTypes";
import mongoose from "mongoose";
import {LikeStatusDBType} from "../types/likeTypes";

const mongoUri = process.env.MONGODB_URL || ""

export const client = new MongoClient(mongoUri);
const db = client.db("network");
export const blogsCollection = db.collection<BlogsDbType>("blogs")
export const postsCollection = db.collection<PostDbType>("posts")
export const usersCollection = db.collection<UserAccountDBType>("users")
export const commentsCollection = db.collection<CommentsDbType>("comments")
export const sessionCollection = db.collection<SessionDBType>("session")
export const blockIpCollection = db.collection<blockIpDBType>("blockIp")
export const connectionsCountCollection = db.collection<connectionsDBType>("connections")
export const tokenCollection = db.collection<TokenDBType>("token")
export const likeCollection = db.collection<LikeStatusDBType>("like")

// const tokenSchema = new mongoose.Schema<TokenDBType>({
//     refreshToken: String,
//     userId: String,
//     deviceId : String
// })

// export const TokenModel = mongoose.model('token', tokenSchema)

export async function runDb(){
    try{
        await client.connect();
        await client.db
        // await mongoose.connect(mongoUri + "/" + "network")
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("can't connected to db ")
        // await client.close()
        await mongoose.disconnect()
    }
}