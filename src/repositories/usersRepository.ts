import {blockTokenCollection, usersCollection} from "./db";
import {UserAccountDBType} from "../types/usersTypes";
import {blockIpDBType} from "../types/ipTypes";
import {BlockTokenDBType} from "../types/blockTokenTypes";

export const usersRepository = {
    async findUserById(id: string) {
        const result = await usersCollection.findOne({id:id})
        return  result
    },
    async findLoginOrEmail(LoginOrEmailL: string) {
        const user = await usersCollection.findOne(
            {$or: [{'accountData.login': LoginOrEmailL},{'accountData.email': LoginOrEmailL}]})
        return user
    },
    async findRefreshToken(refToken: string) {
        let result = await usersCollection
            .findOne({'accountData.refreshToken': refToken})
        return result
    },
    async createUsers(newUsers: UserAccountDBType): Promise<UserAccountDBType> {
        await usersCollection.insertOne(newUsers)
        return newUsers
    },
    // async createToken(id: string, accessToken: string, refreshToken: string) {
    //     let result = await usersCollection
    //         .updateOne({id: id},
    //             {$set: {'accountData.accessToken': accessToken,
    //                     'accountData.refreshToken': refreshToken}})
    //     return result.modifiedCount === 1
    // },
    // async createDevice(id: string, ip: string, title: string, lastActiveDate: string, deviceId: string){
    //     let result = await usersCollection
    //         .insertOne({id: id},
    //             {$push: {"securityDevices.ip": ip,
    //     "securityDevices.title": title,
    //     "securityDevices.lastActiveDate": lastActiveDate,
    //     "securityDevices.deviceId": deviceId}})
    //     return result.modifiedCount === 1
    // },
    async updateConfirmation(id: string) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    },
    async updateCode(id: string, code: any) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'emailConfirmation.confirmationCode': code}})
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
    },
    // async deleteToken(id: string) {
    //     let result = await usersCollection
    //         .updateOne({id: id},
    //             {$set: {'accountData.accessToken': "",
    //                     'accountData.refreshToken': ""}}) //todo как правильно удалить токен
    //     return result.modifiedCount === 1
    // },
    async deleteToken(token: string) {
        let result = await blockTokenCollection
            .insertOne({token: token})
        return true
    },
}