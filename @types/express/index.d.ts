import {OutputUsersDbType, UsersDbType} from "../../src/types/usersTypes";

declare global{
    namespace Express {
        interface Request {
            user: UsersDbType | null

        }
    }
}