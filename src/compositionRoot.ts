import {UsersRepository} from "./repositories/usersRepository";
import {AdminBlogsRepository, BlogsRepository} from "./repositories/blogsRepository";
import {BlogsService} from "./service/blogsService";
import {BlogsControllers} from "./controller/blogsControllers";
import {Container} from "inversify";

const objects: any [] = []
export const blogsRepository = new BlogsRepository()
objects.push(blogsRepository)

export const adminBlogsRepository = new AdminBlogsRepository()
objects.push(adminBlogsRepository)


export const blogsService = new BlogsService(blogsRepository, adminBlogsRepository)
objects.push(blogsService)


export const blogsControllers = new BlogsControllers(blogsService)
objects.push(blogsControllers)

export const ioc = {
    getInstance<T>(ClassType: any){
        const targetInstance = objects.find(o => o instanceof ClassType)
        return targetInstance as T
    }
}
// const container =  new Container()
// container.bind()
