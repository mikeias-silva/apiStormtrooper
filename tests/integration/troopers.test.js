import { request } from "express"


describe('Stormtroopers API', () => {
    it('GET /troopers', async () => {
        const result = await request(app).get('/troopers')
        expect(result.status).toBe(200)
        expect(result.body[0].name).toBe('Jane Doe')
    })
    it('GET /troopers/:id', async () => {
        const result = await request(app).get(`troopers/${id}`)
        expect(result.status).toBe(200)
        expect(result.body.name).toBe('Jane Doe')
    })
    it('POST /troopers', async () => {
        const trooper = {
            name: 'John Doe',
            patent: 'Soldier'
        }
        const result = await request(app).post('/troopers').send(trooper)

        expect(result.status).toBe(201)
        expect(result.body._id).toBeDefined()
        expect(result.body.name).toBe('John Doe')
        expect(result.body.patent).toBe('Soldier')
    })
    it('PUT /troopers/:id', async () => {
        const trooper = {
            patent: 'Soldier'
        }
        const result = await request(app).put(`/trooper/${id}`).send(trooper)
        expect(result.status).toBe(200)
    })
    it('DELETE /troopers/:id', async () => {
        const result = await request(app).delete(`/trooper/${id}`)
        expect(result.status).toBe(204)
    })
})
