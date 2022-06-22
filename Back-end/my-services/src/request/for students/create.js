import { body } from 'express-validator'
import validate from '../../resources/validateMessages'

//* NOTE: route parameter always a string with positive length. https://masteringjs.io/tutorials/express/route-parameters
const validateFieldsList = [
  body('id')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString)
    .isNumeric()
    .withMessage(validate.isNumeric),
  body('firstname')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('lastname')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('gender')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('birthday')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isISO8601()
    .withMessage(validate.isDate),
  body('class')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('contact')
    .notEmpty()
    .withMessage(validate.notEmpty),
  body('contact.phone')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isArray()
    .withMessage(validate.isArray),
  body('contact.phone.*')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('contact.zipcode')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
  body('gpa')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isArray()
    .withMessage(validate.isArray),
  body('gpa.*.grade')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isInt()
    .withMessage(validate.isInt),
  body('gpa.*.gpa')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isFloat({ min: 0, max: 4 }) // float has min max, unlike numeric
    .withMessage(validate.isFloat),
  body('club')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isArray()
    .withMessage(validate.isArray),
  body('club.*')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
]

export default validateFieldsList
