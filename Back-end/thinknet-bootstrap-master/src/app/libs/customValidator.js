// EXAMPLE
const customValidators = {
  isArray: (param) => Array.isArray(param),
  isDate: (dateString) => !Number.isNaN(Date.parse(dateString)),
}

export default customValidators
