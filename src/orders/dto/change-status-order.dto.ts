// import { PartialType } from '@nestjs/mapped-types';
// import { CreateOrderDto } from './create-order.dto';

import { IsEnum } from 'class-validator';
import { orderStatusList } from '../enum/order.enum';
import { OrderStatus } from '../enum';

export class StatusOrderDto {
  @IsEnum(orderStatusList, {
    message: `Possible status values are ${orderStatusList}`,
  })
  status: OrderStatus;
}
