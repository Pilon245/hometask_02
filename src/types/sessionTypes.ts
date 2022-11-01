import {SortDirection} from "../middlewares/queryValidation";


// export type SessionDBType = {
//     ip: string
//     title: string
//     lastActiveDate: string
//     expiresDate: string
//     deviceId: string
//     userId: string
// }

export class SessionDBType {
    constructor(
        public ip: string,
        public  title: string,
        public lastActiveDate: string,
        public expiresDate: string,
        public deviceId: string,
        public userId: string
    ) {
    }

}

export type SessionType = {
    ip: string
    title: string
    lastActiveDate: Date
    deviceId: string
}