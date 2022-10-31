import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config()
import {BlogsDbType} from "../types/blogsTypes";
import {PostDbType} from "../types/postsTypes";
import {UserAccountDBType, UsersDbType} from "../types/usersTypes";
import {CommentsDbType, LikeInfoType, LikeValue} from "../types/commentsTypes";
import {SessionDBType} from "../types/sessionTypes";
import {blockIpDBType, connectionsDBType} from "../types/ipTypes";
import {TokenDBType} from "../types/tokenTypes";
import mongoose from "mongoose";
import {LikeCommentStatusDBType, LikePostStatusDBType} from "../types/likeTypes";

const mongoUri = process.env.MONGODB_URL || ""
const dbName = 'network'
// export const client = new MongoClient(mongoUri);
// const db = client.db("network");
// export const blogsCollection = db.collection<BlogsDbType>("blogs")
// export const postsCollection = db.collection<PostDbType>("posts")
// export const usersCollection = db.collection<UserAccountDBType>("users")
// export const commentsCollection = db.collection<CommentsDbType>("comments")
// export const sessionCollection = db.collection<SessionDBType>("session")
// export const blockIpCollection = db.collection<blockIpDBType>("blockIp")
// export const connectionsCountCollection = db.collection<connectionsDBType>("connections")
// export const tokenCollection = db.collection<TokenDBType>("token")
// export const likeCollection = db.collection<LikeStatusDBType>("like")

const tokenSchema = new mongoose.Schema<TokenDBType>({
    refreshToken: String,
    userId: String,
    deviceId : String
})
const blogSchema = new mongoose.Schema<BlogsDbType>({
    id: String,
    name: String,
    youtubeUrl: String,
    createdAt: String
})
const commentsSchema = new mongoose.Schema<CommentsDbType>({
    id: String,
    content: String,
    userId: String,
    postId: String,
    userLogin: String,
    createdAt: String,
    likesInfo: {
        likesCount: Number,
        dislikesCount: Number,
        myStatus:  String
    }
})
const postSchema = new mongoose.Schema<PostDbType>({
    id: String,
    title: String,
    shortDescription: String,
    content: String,
    blogId: String,
    blogName: String,
    createdAt: String,
})
const userSchema = new mongoose.Schema<UserAccountDBType>({
    id: String,
    accountData: {
        login: String,
        email: String,
        passwordHash: String,
        createdAt: String,
    },
    emailConfirmation: {
        confirmationCode: String,
        expirationDate: Date,
        isConfirmed: String,
    },
    passwordConfirmation: {
        confirmationCode: String,
        expirationDate: Date,
        isConfirmed: String,
    },
})
const sessionSchema = new mongoose.Schema<SessionDBType>({
    ip: String,
    title: String,
    lastActiveDate: String,
    expiresDate: String,
    deviceId: String,
    userId: String,
})
const blockIpSchema = new mongoose.Schema<blockIpDBType>({
    ip: String,
    endpoint: String,
    blockedAt: Number,
})
const connectionSchema = new mongoose.Schema<connectionsDBType>({
    ip: String,
    endpoint: String,
    connectionAt: Number,
})
const likeCommentSchema = new mongoose.Schema<LikeCommentStatusDBType>({
    likesStatus: Number,
    dislikesStatus: Number,
    myStatus: String,
    authUserId: String,
    commentId: String,
})
const likePostSchema = new mongoose.Schema<LikePostStatusDBType>({
    likesStatus: Number,
    dislikesStatus: Number,
    myStatus: String,
    userId: String,
    postId: String,
    login: String,
    addedAt: Date
})

export const BlogsModelClass = mongoose.model('blogs', blogSchema)
export const PostsModelClass = mongoose.model('posts', postSchema)
export const UsersModelClass = mongoose.model('users', userSchema)
export const CommentsModelClass = mongoose.model('comments', commentsSchema)
export const SessionModelClass = mongoose.model('session', sessionSchema)
export const BlockIpModelClass = mongoose.model('blockIp', blockIpSchema)
export const ConnectionsModelClass = mongoose.model('connections', connectionSchema)
export const TokenModelClass = mongoose.model('token', tokenSchema)
export const LikeCommentModelClass = mongoose.model('likeComment', likeCommentSchema)
export const LikePostModelClass = mongoose.model('likePost', likePostSchema)

export async function runDb(){
    try{
        // await client.connect();
        // await client.db
        await mongoose.connect(mongoUri, {dbName}) //{dbName: 'network'}
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("can't connected to db ")
        // await client.close()
        await mongoose.disconnect()
    }
}