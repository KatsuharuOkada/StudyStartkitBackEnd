import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, {
      // 验证器将跳过对验证对象中缺少的全部属性的验证
      skipMissingProperties: true
    });
    if (errors.length > 0) {
      throw new BadRequestException(`验证失败: ${this.formatErrors(errors)}`);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }

  private formatErrors(errors: any[]) {
    return errors
      .map(err => {
        // tslint:disable-next-line: forin
        for (let property in err.constraints) {
          return err.constraints[property];
        }
      })
      .join(', ');
  }
}
