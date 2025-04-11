import { Controller, Get, Post, Body, Inject, UseGuards } from '@nestjs/common';

import { NATS_SERVICE } from '../config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';

import { RegisterUserDto, LoginUserDto } from './dto/index';
import { AuthGuard } from './guard/auth.guard';

import { Token, User } from './decorators';
import { ICurrentUser } from './interfaces/current-user.interface';
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
    return this.client.send('auth.login.user', loginUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyUser(@User() user: ICurrentUser, @Token() token: string) {
    // const verify = await firstValueFrom(
    //   this.client.send('auth.verify.user', token).pipe(
    //     catchError((error) => {
    //       throw new RpcException(error);
    //     }),
    //   ),
    // );

    return { user, token };
  }
}
