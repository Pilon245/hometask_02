import {blogs} from "./blogsRepository";

type PostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}
export let post: PostDbType [] = []

export const postRepository = {
    findPost(title: string | null | undefined) {
        return post
    },

    findPostById(id: string) {
        return post.find(p => p.id === id)
    },
    makePost(title: string, shortDescription: string, content: string, blogId: string) {
        const blogName: any = blogs.find(p => p.id === blogId)
        const newPost: PostDbType = {
            id: String(+(new Date())) ,
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blogName.name

        }
        post.push(newPost)
        return newPost
    },
    replacePost(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        // for (let i=0; i < post.length; i++){
        //     if(post[i].id === id) {
        //         return true
        //     }
        // }
        let postUp = post.find(p => p.id === id)
        if(postUp) {
            postUp.title = title
            postUp.shortDescription = shortDescription
            postUp.content = content
            postUp.blogId = blogId
            return true
        }else {
            return false
        }
    },
    removePost(id: string) {
        for (let i=0; i < post.length; i++){
            if(post[i].id === id) {
                post.splice(i,1)
                return true
            }
        }
    },
    deleteAllPost() {
        post = []
        return true
    }

}