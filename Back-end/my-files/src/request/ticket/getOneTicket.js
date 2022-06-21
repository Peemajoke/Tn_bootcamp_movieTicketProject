import { param } from 'express-validator'
import validate from '../../resources/validateMessages'

//* NOTE: route parameter always a string with positive length. https://masteringjs.io/tutorials/express/route-parameters
const validateFieldsList = [
  param('RefNumber')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isString()
    .withMessage(validate.isString),
]

export default validateFieldsList
