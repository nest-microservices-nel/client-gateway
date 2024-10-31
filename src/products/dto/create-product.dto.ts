import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsString({ message: 'message error' })
  @IsOptional()
  public description: string;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  public price: number;
}
