import {SortDirection} from "../middlewares/queryValidation";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";

export type UsersDbType = {
        id: string
        login: string
        passwordHash: any
        email: string
        createdAt: string
}

export type OutputUsersDbType = {
        id: string
        login: string
        email: string
        createdAt: string
}
export type FindUsersPayload = {
        pageSize: number,
        pageNumber: number,
        sortBy: string,
        sortDirection: SortDirection,
        searchLoginTerm?: string
        searchEmailTerm?: string
}
export type UserAccountDBType = {
        id: string
        accountData: UsersAccountDataType
        emailConfirmation: EmailConfirmationType
        passwordConfirmation: PasswordConfirmationType
}
export type UsersAccountDataType = {
        login: string
        email: string
        passwordHash: string
        createdAt: string
}
export type EmailConfirmationType = {
        confirmationCode: string
        expirationDate: Date
        isConfirmed: boolean
}
export type PasswordConfirmationType = {
        confirmationCode: string
        expirationDate: Date
        isConfirmed: boolean
}
