import executeValidator from './request'
import getById from './getById'
import deleteById from './deleteById'
import create from './create'
import updateById from './updateById'

export default {
  create: executeValidator(create),
  getById: executeValidator(getById),
  updateById: executeValidator(updateById),
  deleteById: executeValidator(deleteById),
}
