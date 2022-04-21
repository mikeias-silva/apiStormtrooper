import createError from "http-errors"
const handleNotFound = (result) => {
    if (!result) {
        throw createError(404, 'trooper não encontrado!')
    }
    return result
}

export {handleNotFound}