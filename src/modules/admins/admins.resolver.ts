import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { AdminsService } from './admins.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AdminssResolver extends BaseResolver {
  constructor(private adminsService: AdminsService) {
    super();
  }
}
