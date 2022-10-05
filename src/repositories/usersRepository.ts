import {usersCollection} from "./db";
import {ObjectId} from "mongodb";
import {UsersDbType} from "../types/usersTypes";

export const usersRepository = {
    async findUsers(login: string, password: string):Promise<boolean>{
     const result = await usersCollection.findOne({login: login, password: password})
        if(result){
            return true
        }else {
            return false
        }
    },
    async createUsers(newUsers: UsersDbType): Promise<UsersDbType> {
        await usersCollection.insertOne(newUsers)
        return newUsers
    },
    async deleteUsers(id: string) : Promise<boolean> {
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async deleteAllUsers() {
        await usersCollection.deleteMany({})
        return true
    }

}