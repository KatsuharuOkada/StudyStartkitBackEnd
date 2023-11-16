import { Resolver } from '@nestjs/graphql';
import { Base } from './Base';

@Resolver()
export class BaseResolver extends Base {
  constructor() {
    super();
  }
}
