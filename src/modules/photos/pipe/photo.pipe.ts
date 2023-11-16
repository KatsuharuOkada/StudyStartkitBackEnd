import Joi from 'joi';
import { JoiValidationPipe } from '../../../vendors/pipes/joiValidation.pipe';
import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import moment from 'moment';

class GetPhotoDataPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.number().integer().positive().max(10).required().messages({
        'number.max': 'id must be less than 10',
        'any.required': 'id is required',
        'number.positive': 'id must be positive',
      })
    );
  }
}

class GetPhotosDataPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object({
        limit: Joi.number().positive().integer().required(),
        offset: Joi.number().positive().integer().min(2).max(100).required().messages({
          'any.required': 'offset is required',
          'number.min': 'offset must be greater than 1',
          'number.max': 'offset must be less than 100',
        }),
        page: Joi.number().positive().integer().optional(),
        isTakeAll: Joi.boolean().optional(),
      })
    );
  }
}

class AddPhotosDataPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object({
        url: Joi.string().required(),
        comment: Joi.string().optional(),
      })
    );
  }
}

class UpdatePhotosDataPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object({
        comment: Joi.string().optional().messages({
          'string.empty': 'message must be input',
        }),
      })
    );
  }
}

export const YYYYMMDD = {
  PATTERN: /^\d{4}\/\d{2}\/\d{2}$/,
  NAME: 'YYYY/MM/DD',
};

/// expected input: YYYY/MM/DD
/// example: 2021/11/09
export const yyyymmddSchema = Joi.string()
  .regex(YYYYMMDD.PATTERN, YYYYMMDD.NAME)
  .custom((value, helpers) => {
    const isoValue = value.replace(/\//g, '');

    if (!moment(isoValue).isValid()) {
      return helpers.error('any.invalid');
    }
    return isoValue;
  })
  .messages({ 'any.invalid': '{{#label}} Invalid date' });

export class SetVitalDataPipe extends JoiValidationPipe {
  constructor() {
    super(
      Joi.object({
        petId: Joi.number().integer().positive().required(),
        wearableId: Joi.number().integer().positive().required(),
        date: yyyymmddSchema.required(), // YYYY/MM/DD
        appearance: Joi.number().integer().positive().valid(0, 1, 2).required(),
        itemArray: Joi.array().items(Joi.number().integer().min(1).max(10)).length(3).required(), //[1,2,3]
        email: Joi.string()
          .regex(/^([a-zA-Z0-9_-.]+)@([a-zA-Z0-9_-.]+).([a-zA-Z]{2,5})$ /)
          .required(),
        email1: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string()
          .regex(/[0-9a-zA-Z]*\[a-zA-Z][0-9a-zA-Z]*/)
          .min(8)
          .max(16)
          .required(),
        data: Joi.array() //validate array of object
          .items({
            swingAm: Joi.number().integer().min(0).required(),
            swingSt: Joi.number().integer().min(0).required(),
            scratchAm: Joi.number().integer().min(0).required(),
            scratchSt: Joi.number().integer().min(0).required(),
            lickAm: Joi.number().integer().min(0).required(),
            moveAm: Joi.number().integer().min(0).required(),
          })
          .min(1)
          .max(31)
          .required(),
      })
    );
  }
  // implement transform method to custom specific message here
  // transform(value: any, _metadata: ArgumentMetadata) {
  //   const validatedValue = super.transform(value, _metadata);

  //   const errMsg = 'custom message here';
  //   if (errMsg) {
  //     throw new BadRequestException(errMsg);
  //   }

  //   return validatedValue;
  // }
}

export { GetPhotoDataPipe, GetPhotosDataPipe, AddPhotosDataPipe, UpdatePhotosDataPipe };
