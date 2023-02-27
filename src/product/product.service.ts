import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toProductDto } from 'src/shared/mapper';
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
    const { name, color, description, price, image_url } = createProductDto;
    const product = await this.productRepo.findOne({
      where: { name, color },
    });
    if (product) {
      throw new HttpException('Product is exist!', HttpStatus.BAD_REQUEST);
    }
    const newProduct = this.productRepo.create({
      name,
      color,
      description,
      price,
      image_url,
    });
    const savedProduct = await this.productRepo.save(newProduct);
    return toProductDto(savedProduct);
  }
}
