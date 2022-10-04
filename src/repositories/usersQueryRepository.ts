import {SortDirection} from "../middlewares/queryValidation";
import {usersCollection} from "./db";
import {getPagesCounts, getSkipNumber} from "../helpers/getSkipNumber";
import {PagesUsersType} from "../types/usersTypes";

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
        const users = await usersCollection
            .find({login: {$regex: searchLoginTerm}, email: {$regex: searchEmailTerm}})
            .sort(sortBy, sortDirection === 'asc' ? 1 : -1)
            .skip(getSkipNumber(pageNumber, pageSize))
            .limit(pageSize)
            .toArray()

        const totalCount = await usersCollection.countDocuments()

        return  {
            pagesCount: getPagesCounts(totalCount, pageSize),
            page: pageNumber,
            pageSize: pageSize,
            totalCount: totalCount,
            items: users.map(u => (
                {
                    id: u._id,
                    login: u.login,
                    password: u.password,
                    email: u.email,
                    createdAt: u.createdAt
                }))}
    }

}