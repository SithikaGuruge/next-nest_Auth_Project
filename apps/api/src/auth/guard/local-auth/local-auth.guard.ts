import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   return super.canActivate(context);
  // }
}