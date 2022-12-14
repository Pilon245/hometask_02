import request from 'supertest'
import {app} from "../../index";
import {create} from "domain";

describe('/blogs', () => {
    beforeAll(async () => {
        await request('/api/testing/all-data')
    })
    //
    // it('blogs return', () => {
    //     request(app)
    //         .get('/api/blogs')
    //         .expect(200,[])
    //
    // })
    // it('blog return', () => {
    //     request(app)
    //         .get('/api/blogs/')
    //         .expect(200,[])
    //
    // })
    let createdBlog: any = null
    it('blog create return', async () => {
       const  createResponse = await request(app)
            .post('/api/blogs')
            .set({"Authorization": "Basic YWRtaW46cXdlcnR5"})
            .send({"name":"somename","youtubeUrl":"https://www.youtube.com/watch?v=MtO76yEYbxA&list=PLNkWIWHIRwMEm1FgiLjHqSky27x5rXvQa"})
            .expect(201)
        createdBlog = createResponse.body

        expect(createdBlog).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            name: expect.any(String),
            youtubeUrl: expect.any(String),
        })
        expect(createdBlog.youtubeUrl).toMatch(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?(.)*$/)
    })
    it('blog update return', async () => {
        const  createResponse = await request(app)
                .put('/api/blogs/' + createdBlog.id)
                .set({"Authorization": "Basic YWRtaW46cXdlcnR5"})
                .send({"name":"somename","youtubeUrl":"https://www.youtube.com/watch?v=MtO76yEYbxA&list=PLNkWIWHIRwMEm1FgiLjHqSky27x5rXvQa"})
                .expect(204)
        createdBlog = createResponse.body


        expect(createdBlog).toEqual({
            id: expect.any(String),
            createdAt: expect.any(String),
            name: expect.any(String),
            youtubeUrl: expect.any(String),
            })
            request(app)
                .get('/api/blogs/' + createdBlog.id)
                .expect(201,[createdBlog])

        // await request(app)
        //     .get('/api/blogs/')
        //     .expect(200,[])

    })
    // it('blog delete return', async () => {
    //     await request(app)
    //         .delete('/api/blogs/' + createdBlog.id)
    //         .expect(204)
    //
    //     await request(app)
    //         .get('/api/blogs')
    //         .expect(200,{
    //             ...createdBlog,
    //             title: expect.any(String)
    //         })
    // })
    // it('post return', () => {
    //     request(app)
    //         .get('/posts/12123')
    //         .expect(204,[])
    //
    // })
    })