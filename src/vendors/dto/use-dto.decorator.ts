import type { AbstractEntity } from '../base/abstract.entity';
import type { AbstractDto } from '../base/abstract.dto';
import type { Constructor } from '../base/types';

export function UseDto(dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
