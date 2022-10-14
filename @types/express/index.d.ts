import {OutputUsersDbType, UserAccountDBType, UsersDbType} from "../../src/types/usersTypes";

declare global{
    namespace Express {
        interface Request {
            user: UserAccountDBType | null

        }
    }
}