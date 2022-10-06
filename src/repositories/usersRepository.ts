import {usersCollection} from "./db";
import {ObjectId} from "mongodb";
import {UsersDbType} from "../types/usersTypes";

export const usersRepository = {
    async findUsers(login: string, password: string): Promise<boolean> {
        const result = await usersCollection.findOne({login: login, password: password})
      //  return  result ? true : false
        if (result) {
            return true
        } else {
            return false
        }
    },
    // async testTwoOr(){
    //     const LoginOrEmailL = '123'
    //     const user = await usersCollection.findOne({
    //         $and: [
    //             {$or: [{email: LoginOrEmailL}, {login: LoginOrEmailL}]},
    //             {$or: [{email: LoginOrEmailL}, {login: LoginOrEmailL}]},
    //         ]
    //
    //     })
    // },
    //TODO посмотреть запросы монго запросы
    async findLoginOrEmail(LoginOrEmailL: string) {
        const user = await usersCollection.findOne({$or: [{email: LoginOrEmailL}, {login: LoginOrEmailL}]})
        return user
    },
    async createUsers(newUsers: UsersDbType): Promise<UsersDbType> {
        await usersCollection.insertOne(newUsers)
        return newUsers
    },
    async deleteUsers(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },
    async deleteAllUsers() {
        await usersCollection.deleteMany({})
        return true
    }

}