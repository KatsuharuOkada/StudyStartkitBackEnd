import { Global, HttpModule, Module } from '@nestjs/common';
import { LineApiService } from './line-api.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [LineApiService],
  exports: [LineApiService],
})
export class LineApiModule {}
