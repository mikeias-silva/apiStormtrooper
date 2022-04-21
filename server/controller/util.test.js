import { handleNotFound } from "./util";

describe('#handleNotFound', () => {
    it('when result = null, sould throw not found', () => {
        const result = null
        expect(() => {
            const result = null
            expect(() => {
                handleNotFound(result)
            }).toThrowError('trooper não encontrado')
            try {
                handleNotFound(result)
            } catch (err) {
                expect(err.stats).toBe(404)
            }
        })
    })
    it('when result ={}, just return', () => {
        const result = {}
        const ret = handleNotFound(result)
        expect(result).toBe(ret)
    })
})