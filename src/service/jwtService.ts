import {UserAccountDBType, UsersDbType} from "../types/usersTypes";
import jwt from 'jsonwebtoken';
import {setting} from "../setting";
import {ObjectId} from "mongodb";

//Todo jwt токен

export const jwtService = {
    async createdJWT (user: UserAccountDBType) {
        const token = jwt.sign({id: user.id}, setting.JWT_SECRET, {expiresIn: '10000'})
        return token
    },
    async createdRefreshJWT (user: UserAccountDBType) {
        const refreshToken = jwt.sign({id: user.id}, setting.JWT_SECRET, {expiresIn: '200000'})
        return refreshToken
    },
    async getUserIdByToken (token: string) {
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return result.id
        } catch (error) {
            return null
        }
    }
}