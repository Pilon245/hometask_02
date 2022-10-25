import {tokenCollection, usersCollection} from "./db";
import {UserAccountDBType} from "../types/usersTypes";
import {blockIpDBType} from "../types/ipTypes";

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
    async findTokenByUserIdAndDeviceId(userId: string, deviceId: string) {
        let result = await tokenCollection
            .findOne({$and: [{userId: userId}, {deviceId: deviceId}]})
        return result
    },
    async createUsers(newUsers: UserAccountDBType): Promise<UserAccountDBType> {
        await usersCollection.insertOne(newUsers)
        return newUsers
    },
    async createToken(userId: string, refreshToken: string, deviceId: string) {
        let result = await tokenCollection
            .insertOne({userId: userId, refreshToken: refreshToken, deviceId: deviceId})
        return result
    },
    async updateToken(userId: string, refreshToken: string, deviceId: string) {
        let result = await tokenCollection
            .updateOne({userId: userId, deviceId: deviceId},
                {$set: {refreshToken: refreshToken}})
        return result.modifiedCount === 1
    },
    // async createDevice(id: string, ip: string, title: string, lastActiveDate: string, deviceId: string){
    //     let result = await usersCollection
    //         .insertOne({id: id},
    //             {$push: {"securityDevices.ip": ip,
    //     "securityDevices.title": title,
    //     "securityDevices.lastActiveDate": lastActiveDate,
    //     "securityDevices.deviceId": deviceId}})
    //     return result.modifiedCount === 1
    // },
    async updateEmailConfirmation(id: string) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    },
    async updatePasswordConfirmation(id: string) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'passwordConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    },
    async updateEmailCode(id: string, code: any) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'emailConfirmation.confirmationCode': code}})
        return result.modifiedCount === 1
    },
    async updatePasswordCode(id: string, code: any) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'passwordConfirmation.confirmationCode': code}})
        return result.modifiedCount === 1
    },
    async updatePasswordUsers(id: string, password: string) {
        let result = await usersCollection
            .updateOne({id: id}, {$set: {'accountData.passwordHash': password}})
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
    async findUserByConfirmationEmailCode(emailConfirmationCode: string) {
        const user = await usersCollection.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    },
    async findUserByConfirmationPasswordCode(passwordConfirmation: string) {
        const user = await usersCollection.findOne({'passwordConfirmation.confirmationCode': passwordConfirmation})
        return user
    },
    async deleteToken(userId: string, refreshToken: string, deviceId: string) {
        let result = await tokenCollection
            .updateOne({userId: userId, deviceId: deviceId},
                {$set: {refreshToken: refreshToken}})
        return result.modifiedCount === 1
    },
    // async deleteToken(token: string) {
    //     let result = await blockTokenCollection
    //         .insertOne({token: token})
    //     return true
    // },
}