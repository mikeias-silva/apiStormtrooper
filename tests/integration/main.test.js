import app from '../../server/app.js'
import request from 'supertest'

describe('main routes', () => {
    it('GET /', async () => {
        const result = await request(app)
            .get('/')
        expect(result.text).toBe('Ola s')
    })
    it('not found', async () => {
        const result = await request(app)
            .get('/does-not-exists')
        expect(result.status).toBe(404)
        expect(result.body.err).toBe('Não encontrado')
    })

    
})


let id;
beforeEach(() => {
    return db.stormtroopers.insert({ name: 'Jane Doe' }).then(result => id = result._id.toString())
})

afterEach(() => db.stormtroopers.remove({}))
