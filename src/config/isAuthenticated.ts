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
      const token = jwt.sign(id, "fjhdkfhgkdhfgkdk", {
        expiresIn: conected ? 1892160000000 : 86400
      })
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
