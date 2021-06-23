import crypto  from "crypto-js";


    export function encrypt(text: string){
       const code = crypto.AES.encrypt(text, "VsDtUThrByziF9o-FSbiKQ")
       return code
    }
    export function decrypt(text: string){
        const bytes  = CryptoJS.AES.decrypt(text, 'VsDtUThrByziF9o-FSbiKQ');
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        return originalText
    }



