import {UsersModelClass} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {FindUsersPayload} from "../types/usersTypes";



export const usersQueryRepository = {
    async findUsers({searchLoginTerm, searchEmailTerm, sortDirection, sortBy, pageSize, pageNumber}: FindUsersPayload) {
        const filter = {$or: [{'accountData.login': {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {'accountData.email': {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}
        const users = await UsersModelClass
            .find({})
            // .project({_id: 0})
            .sort({sortBy: sortDirection === 'asc' ? 1 : -1})
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .lean()
        const totalCount = await UsersModelClass.countDocuments(filter)

        return  {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: users.map(u => (
                {
                    id: u.id,
                    login: u.accountData.login,
                    email: u.accountData.email,
                    createdAt: u.accountData.createdAt
                }))}
    }
}