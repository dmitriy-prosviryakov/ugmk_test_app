import axios from "axios";

class ProductsService {
  apiService;

  constructor() {
    this.apiService = axios.create({
      baseURL: 'http://localhost:3001',
    });
  }

  async getProducts() {
    const response = await this.apiService.get('products');

    return response.data;
  }
}

export const productsService = new ProductsService();
