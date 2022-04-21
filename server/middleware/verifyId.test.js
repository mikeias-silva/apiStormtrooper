import verifyId from './verifyId.js';
import httpErrors from 'http-errors'

let request
let response
let next

beforeEach(() => {
    request = {}
    response = {}
    next = () => { }
})

describe('#verifyId', () => {
    it('id invalido', () => {
        next = (err) =>{
            expect(err).toBeDefined()
            expect(err).toBeInstanceOf(Error)
            expect(err).toBeInstanceOf(httpErrors.HttpError)
            expect(err.message).toBe('id invalido')
            expect(err.status).toBe(422)
            expect(err.stack).toBeDefined()
        }
        request.params = { id: '5ff' }
        verifyId(request, response, next)
    })
    it('id Válido', () =>{
        next = (err) =>{
            expect(err).toBe(undefined)
        }
        request.params = {id:'62570773e8cc8e4aeb99da6c'}
    })
})

// const verifyId = (request, response, next) => {
//     const id = request.params.id
//     if (!/^[0-9]+$/.test(id)) {
//         return next(createError(422, 'id inválido'))
//     }
//     next()
// }
