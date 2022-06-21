import { validationResult } from 'express-validator'
import { HttpStatus } from '@thinknet/express-response-error'

import catchResponse from '../libs/catchResponse'

const errorFormat = ({
  location, msg, param, value,
}) => ({
  value,
  msg: `${param} ${msg}`,
  param,
  location,
})

const executeValidator = (requestValidator) => async (req, res, next) => {
  await Promise.all(requestValidator.map((validate) => validate(req, res, () => {})))
  const errors = await validationResult(req).formatWith(errorFormat)
  if (errors.isEmpty()) {
    return next()
  }
  return catchResponse({
    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
    payload: errors.array({ onlyFirstError: true }),
  })
}

export default executeValidator
