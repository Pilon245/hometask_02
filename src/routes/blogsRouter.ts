import {Router} from 'express';
import {blogsControllers} from "../controller/blogsControllers";
import {authMiddleware} from "../middlewares/authMiddleware";
import {inputBodyValidation, inputQueryValidation, TokenOnCommentIdMiddleware} from "../middlewares/inputValidation";
import {postControllers} from "../controller/postControllers";
import {blogsValidation, postsOnBlogValidation} from "../middlewares/bodyValidation";
import {postOnblogIdValidation} from "../middlewares/paramsValidation";

export const blogsRouter = Router({})

blogsRouter.get('/blogs', blogsControllers.getBlogs)
blogsRouter.get('/blogs/:id',blogsControllers.getBlogsById)
blogsRouter.post('/blogs',authMiddleware,blogsValidation,inputBodyValidation,blogsControllers.createBlogs)
blogsRouter.put('/blogs/:id',authMiddleware,blogsValidation,inputBodyValidation,blogsControllers.updateBlogs)
blogsRouter.delete('/blogs/:id',authMiddleware,blogsControllers.deleteBlogs)
blogsRouter.get('/blogs/:blogId/posts',TokenOnCommentIdMiddleware,postOnblogIdValidation,inputQueryValidation,postControllers.getPostOnBlog)
blogsRouter.post('/blogs/:blogId/posts',authMiddleware,postOnblogIdValidation,inputQueryValidation,
    postsOnBlogValidation,inputBodyValidation,postControllers.createPostonBlog)


