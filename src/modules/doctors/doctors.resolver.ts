import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { DoctorsService } from './doctors.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class DoctorsResolver extends BaseResolver {
  constructor(private doctorsService: DoctorsService) {
    super();
  }
}
