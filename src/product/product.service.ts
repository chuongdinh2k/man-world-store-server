import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-project.dto';
import { ProductDto } from './dto/product.dto';
import { ProductEntity } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<ProductDto> {
    const { name, color, price, description } = createProductDto;
  }
}
