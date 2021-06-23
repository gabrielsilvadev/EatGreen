import Adress from '../models/adress'

export default {
    render(adress: Adress){
       return {
        id: adress.id,
        adress: adress.adress,
        cep: adress.cep,
        complement: adress.complement
       };
    },
    renderMany(adress: Adress[]){
      return adress.map(adress => this.render(adress));
    }
};