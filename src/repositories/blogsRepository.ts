import {strict} from "assert";

type BlogsDbType = {
    id: string
    name: string
    youtubeUrl: string
}
export let blogs: BlogsDbType[] = []

export const blogsRepository = {
    findBlogs(title: string | null | undefined) {
        return blogs
    },

    findBlogsById(id: string) {
        return blogs.find(p => p.id === id)
    },
    makeBlogs(name: string, youtubeUrl: string) {
        const newBlogs: BlogsDbType = {
            id: String(+(new Date())) ,
            name: name,
            youtubeUrl: youtubeUrl
        }
        blogs.push(newBlogs)
        return newBlogs
    },
    replaceBlogs(id: string,name: string, youtubeUrl: string) {
        let blog = blogs.find(p => p.id === id )
        if(blog) {
            blog.name = name
            blog.youtubeUrl = youtubeUrl
            return true
        } else {
            return false
        }
    },
    removeBlogs(id: string) {
        for (let i=0; i < blogs.length; i++){
            if(blogs[i].id === id) {
                blogs.splice(i,1)
                return true
            }
        }
    },
    deleteAllBlogs() {
        blogs = []
        return true
    }

}
