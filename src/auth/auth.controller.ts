import { Controller, Get, Post, Body, Inject } from '@nestjs/common';

import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { RegisterUserDto, LoginUserDto } from './dto/index';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    const registerUser = await firstValueFrom(
      this.client.send('auth.register.user', registerUserDto),
    ).catch((error) => {
      throw new RpcException(error);
    });

    return registerUser;
  }

  @Get('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    const loginUser = await firstValueFrom(
      this.client.send('auth.login.user', loginUserDto),
    );

    return loginUser;
  }

  @Get('verify')
  async verifyUser(@Body() data: any) {
    const verify = await firstValueFrom(
      this.client.send('auth.verify.user', data),
    );

    return verify;
  }
}
