import { Controller } from '@nestjs/common';
import { Base } from './Base';

@Controller()
export class BaseController extends Base {
  constructor() {
    super();
  }
}
