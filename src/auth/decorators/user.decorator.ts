import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
//are a lot of decorator that i can created, for example this is a decorator to add on controller and replace decorator like Body, Query, Params, etc...
// @Get('verify')
//   async verifyUser(@User() req: Request) {
//     const verify = await firstValueFrom(
//       this.client.send('auth.verify.user', req['token']).pipe(
//         catchError((error) => {
//           throw new RpcException(error);
//         }),
//       ),
//     );

//     return verify;
//   }
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (!request.user) {
      throw new InternalServerErrorException(
        'User dont found in the request header.',
      );
    }
    return request.user;
  },
);
