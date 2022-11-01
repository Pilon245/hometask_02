import {UserAccountDBType} from "../types/usersTypes";
import {blockIpDBType} from "../types/ipTypes";
import {TokenModelClass, UsersModelClass} from "./db";

class UsersRepository {
    async findUserById(id: string) {
        const result = await UsersModelClass.findOne({id:id})
        return  result
    }
    async findLoginOrEmail(LoginOrEmailL: string) {
        const user = await UsersModelClass.findOne(
            {$or: [{'accountData.login': LoginOrEmailL},{'accountData.email': LoginOrEmailL}]})
        return user
    }
    async findTokenByUserIdAndDeviceId(userId: string, deviceId: string) {
        let result = await TokenModelClass
            .findOne({$and: [{userId: userId}, {deviceId: deviceId}]})
        return result
    }
    async createUsers(newUsers: UserAccountDBType): Promise<UserAccountDBType> {
        await UsersModelClass.insertMany(newUsers)
        return newUsers
    }
    async createToken(userId: string, refreshToken: string, deviceId: string) {
        let result = await TokenModelClass
            .insertMany({userId: userId, refreshToken: refreshToken, deviceId: deviceId})
        return result
    }
    async updateToken(userId: string, refreshToken: string, deviceId: string) {
        let result = await TokenModelClass
            .updateOne({userId: userId, deviceId: deviceId},
                {refreshToken})
        return result.modifiedCount === 1
    }
    async updateEmailConfirmation(id: string) {
        let result = await UsersModelClass
            .updateOne({id: id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
    async updatePasswordConfirmation(id: string) {
        let result = await UsersModelClass
            .updateOne({id: id}, {$set: {'passwordConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
    async updateEmailCode(id: string, code: any) {
        let result = await UsersModelClass
            .updateOne({id: id}, {$set: {'emailConfirmation.confirmationCode': code}})
        return result.modifiedCount === 1
    }
    async updatePasswordCode(id: string, code: any) {
        let result = await UsersModelClass
            .updateOne({id: id}, {$set: {'passwordConfirmation.confirmationCode': code}})
        return result.modifiedCount === 1
    }
    async updatePasswordUsers(id: string, password: string) {
        let result = await UsersModelClass
            .updateOne({id: id}, {$set: {'accountData.passwordHash': password}})
        return result.modifiedCount === 1
    }
    async deleteUsers(id: string): Promise<boolean> {
        const result = await UsersModelClass.deleteOne({id: id})
        return result.deletedCount === 1
    }
    async deleteAllUsers() {
        return await UsersModelClass.deleteMany({})
    }
    async findUserByConfirmationEmailCode(emailConfirmationCode: string) {
        const user = await UsersModelClass.findOne({'emailConfirmation.confirmationCode': emailConfirmationCode})
        return user
    }
    async findUserByConfirmationPasswordCode(passwordConfirmation: string) {
        const user = await UsersModelClass.findOne({'passwordConfirmation.confirmationCode': passwordConfirmation})
        return user
    }
    async deleteToken(userId: string, refreshToken: string, deviceId: string) {
        let result = await TokenModelClass
            .updateOne({userId: userId, deviceId: deviceId},
                {refreshToken})
        return result.modifiedCount === 1
    }
}

export const usersRepository = new UsersRepository()