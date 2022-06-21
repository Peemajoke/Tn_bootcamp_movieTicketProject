export default {
  INTERNAL_SERVER_ERROR: {
    httpStatus: 500,
    serviceCode: 'INTERNAL_SERVER_ERROR',
  },
  GET_USER_BY_ID_NOT_FOUND: {
    httpStatus: 404,
    serviceCode: 'GET_USER_BY_ID_NOT_FOUND',
    description: 'Not found.',
  },
  GET_USER_BY_ID_ERROR: {
    httpStatus: 500,
    serviceCode: 'GET_USER_BY_ID_ERROR',
  },
  CREATE_USER_ERROR: {
    httpStatus: 500,
    serviceCode: 'CREATE_USER_ERROR',
  },
  INCORRECT_USERNAME_OR_PASSWORD: {
    httpStatus: 422,
    serviceCode: 'INCORRECT_USERNAME_OR_PASSWORD',
    description: 'The username or password is incorrect.',
  },
}
