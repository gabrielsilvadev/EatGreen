import * as nodemailer from "nodemailer";
import { send } from "process";

export default  {
    async transporte(email: string, token: string){
    let testAccount = await nodemailer.createTestAccount();
    let transporte = nodemailer.createTransport({
      //host: 'smtp.ethereal.email',
      //port: 587,
      //secure: false,
      service: 'Gmail', 
      auth: {
        user: 'sr.lobak@gmail.com',
        pass: 'd23a2018',
      },
    });

    let info = await transporte.sendMail({
         from:'<sr.lobak@gmail.com>',
          to: email,
          html:` <h1>Voce esqueceu sua senha, Nao tem problema!</h1>
          <p>Utilize esse token: ${token}</p>`,
    })
    console.log(info.messageId, info.envelope)
  }
}



