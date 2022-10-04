export enum SortDirection {
    asc = 'asc',
    desc = 'desc'
}

type QueryValidationResult = {
    pageNumber: number,
    pageSize: number, sortBy: string,
    sortDirection: SortDirection,
    searchNameTerm: string,
    searchLoginTerm: string,
    searchEmailTerm: string
}

export const queryValidation  = (query: any): QueryValidationResult => {
    const pageNumber = typeof query.pageNumber === "string" ? +query.pageNumber : 1
    const pageSize = typeof query.pageSize === "string" ? parseInt(query.pageSize, 10) : 10
    const sortBy = typeof query.sortBy === "string" ? query.sortBy : "createdAt"
    const sortDirection = typeof query.sortDirection === "string" ? query.sortDirection : "desc"
    const searchNameTerm  = typeof query.searchNameTerm === "string" ? query.searchNameTerm?.toString() : ""
    const searchLoginTerm = typeof query.searchLoginTerm === "string" ? query.searchLoginTerm?.toString() : ""
    const searchEmailTerm = typeof query.searchEmailTerm === "string" ? query.searchEmailTerm?.toString() : ""
    return {pageNumber, pageSize, sortBy, sortDirection, searchNameTerm, searchLoginTerm, searchEmailTerm}
}