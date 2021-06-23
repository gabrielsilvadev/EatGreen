import Product from '../models/product'
import Images from './images_view'
export default {
    render(product: Product){
       return {
        id: product.id,
        name: product.name,
        price: product.price,
        category: product.category,
        image: Images.renderMany(product.images)
       };
    },
    renderMany(product: Product[]){
      return product.map(product => this.render(product));
    }
};