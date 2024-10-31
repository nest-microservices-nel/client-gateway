import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
  //  implements RpcExceptionFilter<RpcException>
  catch(exception: RpcException, host: ArgumentsHost) {
    // : Observable<any>

    const ctx = host.switchToHttp();

    // console.log('getType:', host.getType());
    // console.log('getArgs:', host.getArgs());

    // console.log('switchToRpc:', host.switchToRpc());
    // console.log('switchToWs:', host.switchToWs());

    // console.log('getArgByIndex:', host.getArgByIndex(0));

    const response = ctx.getResponse();
    const rpcError = exception.getError();
    console.log('🚀 ~ RpcCustomExceptionFilter ~ rpcError:', rpcError);

    if (
      typeof rpcError === 'object' &&
      'status' in rpcError &&
      'message' in rpcError
    ) {
      const status = isNaN(+rpcError.status) ? 400 : +rpcError.status;

      return response.status(status).json(rpcError);
    }

    return response.status(500).json({
      status: 500,
      message: rpcError, // 'Internal server error.',
    });
  }
}
