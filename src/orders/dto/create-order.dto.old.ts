import { OrderStatus } from '../enum/order.enum';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { orderStatusList } from '../enum/order.enum';

export class CreateOrderDto {
  @IsNumber()
  @Min(1)
  @IsPositive()
  totalAmount: number;

  @IsNumber()
  // @Min(1)
  @IsPositive() // Con el decorador isPositive es suficiente para que la validacion solo permita numeros > 0
  totalItems: number;

  @IsEnum(orderStatusList, {
    message: `Possible status values are ${orderStatusList}`,
  })
  @IsOptional()
  status: OrderStatus = OrderStatus.PENDING;

  @IsBoolean()
  @IsOptional()
  paid: boolean = false;
}
