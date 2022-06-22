import { param } from 'express-validator'
import validate from '../../resources/validateMessages'

//* NOTE: route parameter always a string with positive length. https://masteringjs.io/tutorials/express/route-parameters
const validateFieldsList = [
  param('Number')
    .notEmpty()
    .withMessage(validate.notEmpty)
    .isInt()
    .withMessage(validate.isInt),
]

export default validateFieldsList
