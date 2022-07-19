import { EntityRepository, Repository } from 'typeorm';
import Company from '../entities/Company';
import transportEmail from '../middleware/mailer';
import { createToken } from '../config/isAuthenticated';
import { comparePassword, passwordHash } from '../config/isAuthenticated';
import { CompanyInterface } from '../base-interfaces/company.interface';

@EntityRepository(Company)
class CompanyRepository extends Repository<Company> {
  async Create(company: CompanyInterface) {
    const saveCompany = await this.create(company);
    const token = await createToken(saveCompany.id);

    await this.save(saveCompany);

    return { company: saveCompany, token: token };
  }
  async update(id: string, company: CompanyInterface) {
    await this.update(id, company);
    return { message: 'atualizado com sucesso' };
  }
  async findByCompany(id: string){
    const company = await this.findOne(id)
    return company
  }

  async auth(email: string, password: string, conected: boolean) {
    const findCompany = await this.findOneOrFail({ email: email });
    if (!findCompany) {
      throw new Error('Company or User not exists');
    }

    if (await comparePassword(password, findCompany.password)) {
      throw new Error('Invalid password');
    }
    const token = await createToken(findCompany.id, conected);
   
    return { user: findCompany, token: token };
  }

  /*  async validationCompany(request: Request, response: Response) {
        return response.send({ ok: true, user: request.params.idCompany })
      }*/

  async forgot(email: string) {
    const findCompany = await this.findOne({ email: email });
    if (!findCompany) throw new Error('Company or User not found');

    const token = await createToken(findCompany.id);
    const now = new Date();
    now.setHours(now.getHours() + 1);
    await this.update(findCompany.id, {
      passwordResetToken: token,
      passwordResetExpire: now,
    });

    await transportEmail.transporte(email, token);
    return { sucess: 'token enviado' };
  }
  async resetPassword(email: string, token: string, password: string) {
    const company = await this.findOne({ email: email });
    if (!company) throw new Error('Company or User not found');
    if (token !== company.passwordResetToken) throw new Error('Token invalid');
    const now = new Date();

    if (now > company.passwordResetExpire) throw new Error('Token expired');
    company.password = await passwordHash(password);
    await this.save(company);
    return company;
  }
}
export default CompanyRepository;
