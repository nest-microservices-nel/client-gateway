import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';

import { NatsModule } from 'src/transports/nats.module';

@Module({
  controllers: [OrdersController],
  imports: [NatsModule],
  // Se crea la conexion al ms de ordenes especificando un nombre interno con el cual se va a identificar para ser inyectado
  // se configura tambien la direccion del ms
  // imports: [
  //   ClientsModule.register([
  //     {
  //       name: ORDER_MS,
  //       transport: Transport.NATS,
  //       options: {
  //         servers: envs.natsServers,
  //       },
  //     },
  //   ]),
  // ],
})
export class OrdersModule {}
