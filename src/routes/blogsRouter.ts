import "reflect-metadata";
import {Router} from 'express';
import {container, ioc} from "../compositionRoot";
import {authMiddleware} from "../middlewares/authMiddleware";
import {inputBodyValidation, inputQueryValidation, TokenOnCommentIdMiddleware} from "../middlewares/inputValidation";
import {postControllers} from "../controller/postControllers";
import {blogsValidation, postsOnBlogValidation} from "../middlewares/bodyValidation";
import {postOnblogIdValidation} from "../middlewares/paramsValidation";
import {BlogsControllers} from "../controller/blogsControllers";
// import ioc from "../compositionRoot";
// const blogsControllers = ioc.getInstance<BlogsControllers>(BlogsControllers)

const blogsControllers = container.resolve<BlogsControllers>(BlogsControllers) //  достучаться до обЪекта

export const blogsRouter = Router({})

blogsRouter.get('/blogs', blogsControllers.getBlogs.bind(blogsControllers)) // todo depenciv injection
blogsRouter.get('/blogs/:id',blogsControllers.getBlogsById.bind(blogsControllers))
blogsRouter.post('/blogs',authMiddleware,blogsValidation,inputBodyValidation,
    blogsControllers.createBlogs.bind(blogsControllers))
blogsRouter.put('/blogs/:id',authMiddleware,blogsValidation,inputBodyValidation,
    blogsControllers.updateBlogs.bind(blogsControllers))
blogsRouter.delete('/blogs/:id',authMiddleware,blogsControllers.deleteBlogs.bind(blogsControllers))
blogsRouter.get('/blogs/:blogId/posts',TokenOnCommentIdMiddleware,postOnblogIdValidation,inputQueryValidation,
    postControllers.getPostOnBlog)
blogsRouter.post('/blogs/:blogId/posts',authMiddleware,postOnblogIdValidation,inputQueryValidation,
    postsOnBlogValidation,inputBodyValidation,postControllers.createPostonBlog)


