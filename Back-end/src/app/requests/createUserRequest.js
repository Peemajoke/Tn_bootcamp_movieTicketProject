// EXAMPLE
import { body } from 'express-validator'

import customValidators from '../libs/customValidator'
import validateMsg from '../constants/validateMessages'

const createUserRequest = [
  body('id')
    .notEmpty()
    .withMessage(validateMsg.notEmpty)
    .bail()
    .isInt()
    .withMessage(validateMsg.isInt),
  body('resumeCode')
    .isInt()
    .withMessage(validateMsg.isInt),
  body('emails')
    .custom(customValidators.isArray)
    .withMessage(validateMsg.isArray),
]

export default createUserRequest
