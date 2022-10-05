import {SortDirection} from "../middlewares/queryValidation";
import {usersCollection} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {PagesUsersType} from "../types/usersTypes";
import {PagesBlogType} from "../types/blogsTypes";

type FindUsersPayload = {
    pageSize: number,
    pageNumber: number,
    sortBy: string,
    sortDirection: SortDirection,
    searchLoginTerm?: string
    searchEmailTerm?: string

}

export const usersQueryRepository = {
    async findUsers({searchLoginTerm, searchEmailTerm, sortDirection, sortBy, pageSize, pageNumber}: FindUsersPayload)
        : Promise<PagesUsersType> {
        const filter = {$or: [{login: {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}}, {email: {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}]}
        const users = await usersCollection
            .find(filter)
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await usersCollection.countDocuments(filter)

        return  {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: users.map(u => (
                {
                    id: u._id,
                    login: u.login,
                    email: u.email,
                    createdAt: u.createdAt
                }))}
    }

}