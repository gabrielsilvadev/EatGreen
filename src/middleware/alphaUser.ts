import  jwt  from 'jsonwebtoken'
import {Request, Response, NextFunction} from 'express'

const auth = require('../config/autha.json')

export default  (request: Request,response: Response,next: NextFunction)=>{
    const authheadrs = request.headers.authorization;
    if(!authheadrs)
    return response.status(401).send({err:'error'})

    const parts = authheadrs.split(' ')

    if (parts.length !== 2)
     return response.status(401).send({err:'Token invalido'})
    const [scheme,token] = parts

    if(!/^Bearer$/i.test(scheme))
     return response.status(401).send({error:'Token mal formado'});

   jwt.verify(token,auth.secret,(err: any,decoded: any)=>{
     if (err) return response.status(401).send({error:'Token invalido'})
     request.body.idUser = decoded.data
     return next()
   })

}
