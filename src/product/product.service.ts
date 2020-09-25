import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';


@Injectable()
export class ProductService {
  /**
   * Beware, when using Model<INTERFACE>, the interface has to extend from mongoose.Document
   * @param productModule 
   */
  constructor(@InjectModel('Product') private productModule: Model<Product>){
    
  }

  async getProducts(): Promise<Product[]> {
      return await this.productModule.find();
    }

  async getProduct(id: string): Promise<Product> {
    return await this.productModule.findById(id);
  }

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    return await this.productModule.create(createProductDTO);
  }

  async updateProduct(productID: string, createProductDTO: CreateProductDTO): Promise<Product> {
    return await this.productModule.findByIdAndUpdate(productID, createProductDTO, {new: true, useFindAndModify: true});
}

  async deleteProduct(id: string): Promise<Product> {
    return await this.productModule.findByIdAndDelete(id);
  }
}
