import { Request, Response } from 'express';
import CompanyServices from '../services/company';
export default class CompanyController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const companyData = request.body;
      const createCompany = new CompanyServices.CreateUserService();
      const company = await createCompany.execute(companyData);
      return response.status(200).json(company);
    } catch (err) {
      throw new Error(`Dados inválidos: ${err}`);
    }
  }

  async update(request: Request, response: Response) {
    try {
      const { company, id } = request.body;
      const updateCompany = new CompanyServices.SaveCompanyService();
      const companySave = await updateCompany.execute(id, company);
      return response.status(200).json(companySave);
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async auth(request: Request, response: Response) {
    const { email, password, conected } = request.body;
    const auth = new CompanyServices.AuthCompanyService();
    const authCompany = await auth.execute(email, password, conected);
    return response.status(200).json(authCompany);
  }

  /* async validationCompany(request: Request, response: Response) {
    return response.send({ ok: true, user: request.params.idCompany })
  },*/

  async forgot(request: Request, response: Response) {
    const { email } = request.body;
    const forgotPassword = new CompanyServices.ForgotCompanyService();
    await forgotPassword.execute(email);
    return response.status(200).json({message: "send email"})
  }
  async resetPassword(request: Request, response: Response) {
    const {email, token, password} = request.body
    const resetPassword = new CompanyServices.ResetPasswordCompanyService()
    await resetPassword.execute(email, token, password)
    return response.status(200).send()
  }
}
