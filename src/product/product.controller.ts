import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDto } from './dto/create-project.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  //   @UseGuards(JwtAuthGuard)
  @Post('create')
  public async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<CreateProductDto> {
    const result = await this.productService.createProduct(createProductDto);
    return result;
  }
}
