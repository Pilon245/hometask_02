import {UsersDbType} from "../types/usersTypes";
import jwt from 'jsonwebtoken';
import {setting} from "../setting";
import {ObjectId} from "mongodb";

//Todo jwt токен

export const jwtService = {
    async createdJWT (user: UsersDbType) {
        console.log("JWt", setting.JWT_SECRET)
        const token = jwt.sign({id: user.id}, setting.JWT_SECRET, {expiresIn: '1h'})
        return token
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