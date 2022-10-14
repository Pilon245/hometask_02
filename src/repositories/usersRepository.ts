import {usersCollection} from "./db";
import {ObjectId} from "mongodb";
import {UserAccountDBType, UsersDbType} from "../types/usersTypes";

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
    async findUserById(id: string) {
        const result = await usersCollection.findOne({id:id}) // тут как делать с ид
        return  result
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
        const user = await usersCollection.findOne({login: LoginOrEmailL})
        return user
    },
    async createUsers(newUsers: UserAccountDBType): Promise<UserAccountDBType> {
        await usersCollection.insertOne(newUsers)
        return newUsers
    },
    async updateConfirmation(id: string) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    },
    async deleteUsers(id: string): Promise<boolean> {
        const result = await usersCollection.deleteOne({id: id})
        return result.deletedCount === 1
    },
    async deleteAllUsers() {
        await usersCollection.deleteMany({})
        return true
    },
    async findUserByConfirmationCode(emailConfirmationCode: string) {
        const user = await usersCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    }
}