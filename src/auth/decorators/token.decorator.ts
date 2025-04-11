import { createParamDecorator, ExecutionContext } from '@nestjs/common';
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
export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.token;
  },
);
