import { Resolver } from '@nestjs/graphql';
import { BaseResolver } from '../../vendors/base/base.resolver';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../vendors/guards/auth.guard';
import { CommentsService } from './comments.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CommentsResolver extends BaseResolver {
  constructor(private commentsService: CommentsService) {
    super();
  }
}
