import {UsersDbType} from "../types/usersTypes";
import jwt from 'jsonwebtoken';
import {setting} from "../setting";
import {ObjectId} from "mongodb";

//Todo jwt токен

export const jwtService = {
    async createdJWT (user: UsersDbType) {
        const token = jwt.sign({_id: user._id}, setting.JWT_SECRET, {expiresIn: '1h'})
        return token
    },
    async getUserIdByToken (token: string) {
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return new ObjectId(result._Id)
        } catch (error) {
            return null
        }
    }
}