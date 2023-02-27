import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  image_url: string;

  // @IsNotEmpty()
  // created_at: Date;

  // @IsNotEmpty()
  // updated_at: Date;
}
