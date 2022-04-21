import createError from "http-errors"
const verifyId = (request, response, next) => {
    const id = request.params.id
    if (!/^[0-9]+$/.test(id)) {
        return next(createError(422, 'id invalido'))
    }
    next()
}

export default verifyId