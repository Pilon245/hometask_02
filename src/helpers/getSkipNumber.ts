import bcrypt from "bcrypt";

export const getSkipNumber = (pageNumber: number,pageSize: number) => {
    return (pageNumber - 1) * pageSize
}

export const getPagesCounts= (totalCount: number, pageSize: number) => {return (Math.ceil(totalCount/pageSize))}
//TODO перенести SoltOrRounds в переменную окружения
export const generatePasswordForDb = async (password: string, ) => {
        const hash = await bcrypt.hash(password, 10)
        // console.log('hash' + hash)
        return hash
    }
