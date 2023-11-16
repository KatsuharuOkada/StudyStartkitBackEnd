import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { LineApiService } from '../../common/line-api/line-api.service';

const HEADER_AUTHORIZATION = 'authorization';

@Injectable()
export class StampAuthGuard implements CanActivate {
  constructor(@Inject('LineApiService') private readonly lineApiService: LineApiService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext().req;

    try {
      request.user = await this.lineApiService.getUser(request.headers[HEADER_AUTHORIZATION]);
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
