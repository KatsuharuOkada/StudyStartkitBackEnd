import { JoiValidationPipe } from './joiValidation.pipe';
import * as joi from '@hapi/joi';

describe('Joi validate', () => {
  it('When validate  passes', () => {
    const testObj = { name: '1' };
    const schema = {
      name: joi.string().min(1)
    };
    const target = new JoiValidationPipe(schema);
    expect(target.transform(testObj, null)).toBe(testObj);
  });
});
