import { Args, Query, Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { ClinicsService } from './clinics.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ClinicsResolver extends BaseResolver {
  constructor(private clinicsService: ClinicsService) {
    super();
  }
}
