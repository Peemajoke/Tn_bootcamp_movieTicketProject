import { tracer } from '@thinknet/observer'
import ResponseError from '@thinknet/express-response-error'

import { APP_ENV } from '../../config'
import RESPONSE_ERROR from '../constants/responseError'

import { analyzer } from './logger'

/**
 * Logic สามารถปรับได้ตามการใช้งานของ service
 * ข้อมูลที่จะต้องมีได้แก่ httpStatus, serviceCode (คำที่อ่านแล้วเข้าใจได้ง่าย), traceID, description (ควรได้ error message จริงของระบบ)
 * ข้อมูลที่เป็น optional คือ payload สำหรับ response ข้อมูลอื่นๆตามการใช้งานของ service
 */

const catchResponse = ({
  httpStatus, serviceCode, payload, description, error,
}) => {
  const traceID = new tracer().getTraceId() // eslint-disable-line new-cap
  const errorData = {
    httpStatus: httpStatus || RESPONSE_ERROR.INTERNAL_SERVER_ERRO,
    serviceCode,
    traceID,
    description: error?.message || description,
    payload,
  }

  if (!errorData.httpStatus) {
    Object.assign(errorData, RESPONSE_ERROR.INTERNAL_SERVER_ERROR)
  }

  if (APP_ENV !== 'test') {
    analyzer.error({ ...errorData, payload: JSON.stringify(errorData.payload) })
  }

  throw new ResponseError(errorData)
}

export default catchResponse
