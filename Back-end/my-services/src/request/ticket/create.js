import { body } from 'express-validator'
import validate from '../../resources/validateMessages'

//* NOTE: route parameter always a string with positive length. https://masteringjs.io/tutorials/express/route-parameters
const validateFieldsList = [
  body('ref_num')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('email')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('seat')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('price')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isInt()
    .withMessage(validate.isInt),
  body('showTime')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isObject()
    .withMessage(validate.isObject),
  body('showTime.theater')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isInt()
    .withMessage(validate.isInt),
  body('showTime.dateTime')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isISO8601()
    .withMessage(validate.isDate),
]

export default validateFieldsList
