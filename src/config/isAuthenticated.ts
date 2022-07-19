import { hash, compare } from "bcryptjs"

import jwt from "jsonwebtoken"
    export async function passwordHash(password: string){
      const code = await hash(password, 10)
      return code
    }
    export async function comparePassword(current_password: string, target_password: string){
       const password =  await compare(current_password, target_password)
       return password
    }
    export async function createToken(id: string, conected?: boolean){
      const token = await jwt.sign({
        exp: conected ? 12535463648 : Math.floor(Date.now() / 1000) + (60 * 60),
        data: id
      }, '647431b5ca55b04fdf3c2fce31ef1915');
      return token
    }
   
   /* export function encrypt(text: string){
       const code = crypto.AES.encrypt(text, "VsDtUThrByziF9o-FSbiKQ")
       return code
    }
    export function decrypt(text: string){
        const bytes  = CryptoJS.AES.decrypt(text, 'VsDtUThrByziF9o-FSbiKQ');
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }*/
