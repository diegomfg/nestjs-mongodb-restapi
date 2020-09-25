import { Controller, Get, Post, HttpStatus, NotFoundException } from '@nestjs/common';
import { Delete } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { Body, Param, Res } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateProductDTO } from './dto/product.dto';
import { Product } from './interfaces/product.interface';
import { ProductService } from './product.service'

@Controller('product')
export class ProductController {

  constructor(private productService: ProductService){
  }

  @Get()
  async index() {
    return await this.productService.getProducts();
  }

  @Get("/:productID")
  async getOne(@Param("productID") productID: string){
    const product = await this.productService.getProduct(productID);
    console.log(product);
    if(!product){
      throw new NotFoundException(`Unable to find product with id ${productID}`)
    }
    return product;
  }

  @Post("/create")
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {

    const product: Product = await this.productService.createProduct(createProductDTO);

    return res.status(HttpStatus.OK).json({
      message: "Received",
      product
    })
  }

  @Put("/:productID")
  async update(@Res() res, @Param('productID') id: string, @Body() updateProductDTO: CreateProductDTO){
    const updatedProduct = await this.productService.updateProduct(id, updateProductDTO);
    return res.status(HttpStatus.OK).json(updatedProduct);
  }

  // @Delete("/:productID")
  // async delete(@Res() res, @Param('productID') id: string){
  //   const deletedProduct = await this.productService.deleteProduct(id);
  //   if(!deletedProduct) throw new NotFoundException(`Unable to delete product ${id}`);
  //   return res.status(HttpStatus.OK).json({
  //     message: "Deleted successfully",
  //     deletedProduct
  //   })
  // }

  @Delete("/delete")
  async deleteProductQuery(@Res() res, @Query('productID') productID: string){

    console.log(productID);
    const product = await this.productService.deleteProduct(productID);

    if(!product) throw new NotFoundException(`Unable to delete record with id: ${productID}`)

    return res.status(HttpStatus.OK).json({
      message: "Deleted successfully",
      product
    });
  }
}