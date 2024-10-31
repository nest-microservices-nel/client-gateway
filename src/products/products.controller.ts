import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { NATS_SERVICE } from 'src/config';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.client.send({ cmd: 'create_product' }, createProductDto).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );
  }

  @Get()
  getProducts(@Query() paginationDto: PaginationDto) {
    //send: envia una solicitud y esperar una respuesta
    //emit: envia una solicitud pero no espera la respuesta (envio de eventos)
    return this.client.send({ cmd: 'find_all_products' }, paginationDto);
  }

  @Get(':id') // es la ruta
  async getProductById(@Param('id') id: string) {
    return this.client.send({ cmd: 'find_one_product' }, { id }).pipe(
      catchError((err) => {
        throw new RpcException(err);
      }),
    );

    // try {
    //   const products = await firstValueFrom(
    //     this.productsClient.send({ cmd: 'find_one_product' }, { id }),
    //   );

    //   return products;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id') // es la ruta
  async deleteProductById(@Param('id') id: string) {
    try {
      const productsDeleted = await firstValueFrom(
        this.client.send({ cmd: 'delete_product' }, { id }),
      );

      return productsDeleted;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id') // es la ruta
  async updateProductById(
    @Param('id', ParseIntPipe) id: number, //ParseIntPipe TRANSFORMA EL DATO QUE VIENE EN LA URL (ORIGINALMENTE STRING) A un number
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const productUpdated = await firstValueFrom(
        this.client.send(
          { cmd: 'update_product' },
          { id, ...updateProductDto },
        ),
      );

      return productUpdated;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
