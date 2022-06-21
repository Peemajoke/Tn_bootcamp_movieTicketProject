import executeValidator from './executeValidator'
import createUserRequest from './createUserRequest'

export default {
  createUserRequest: executeValidator(createUserRequest),
}
