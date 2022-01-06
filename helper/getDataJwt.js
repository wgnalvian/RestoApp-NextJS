import jwt from 'jsonwebtoken'


export const getDataJwt = (token,secret) => {

    return new Promise((resolve,reject) => {

        jwt.verify(token,`${secret}`,(err, decode) => {
            resolve({err,decode})
        })
    })
}