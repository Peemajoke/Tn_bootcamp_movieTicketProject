import studentModel from '../models/student'
import {
  NOT_FOUND_DATA, ERROR_CREATION, ERROR_DELETED, ERROR_UPDATED,
} from '../constants/errors/unsuccess'
import {
  SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED,
} from '../constants/success'

const getAllStudents = async (req, res) => {
  try {
    const result = await studentModel.find()
    setTimeout(() => {
      res.status(200).json(result)
    }, 2000)
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is not a single student.' })
    }
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}

const getStudentById = async (req, res) => {
  const { ID } = req.params
  try {
    const result = await studentModel.findOne({ id: ID })
    if (!result) {
      res.status(404).json({ httpCode: '404', Message: 'Sorry, there is not student you were looking for.' })
    }
    res.status(200).json(result)
  } catch (err) {
    throw NOT_FOUND_DATA
  }
}
const createStudent = async (req, res) => {
//   const {
//     id, firstname, lastname, gender, birthday, classroom, contact, gpa, club,
//   } = req.body
  try {
    // await studentModel.create({
    //   id, firstname, lastname, gender, birthday, classroom, contact, gpa, club,
    // })
    await studentModel.create(req.body)
    res.status(201).json(SUCCESS_CREATED)
  } catch (error) {
    throw ERROR_CREATION
  }
}

const updateStudentById = async (req, res) => {
  const { ID } = req.params
  //   const {
  //     id, firstname, lastname, gender, birthday, classroom, contact, gpa, club,
  //   } = req.body

  // findOneAndUpdate
  // const result = await studentModel.findOneAndUpdate({ id: ID }, {
  //   id, firstname, lastname, gender, birthday, classroom, contact, gpa, club,
  // })
  try {
    const result = await studentModel.findOneAndUpdate({ id: ID }, req.body)
    if (!result) {
      throw NOT_FOUND_DATA
    }
    res.status(200).json(SUCCESS_UPDATED)
  } catch (err) {
    throw ERROR_UPDATED
  }
}

const deleteStudentById = async (req, res) => {
  const { ID } = req.params
  try {
    const result = await studentModel.deleteOne({ id: ID })
    console.log(result)
    if (result.deletedCount === 0) {
      res.status(404).json({ httpCode: '404', message: 'found 0 student matched with the provided ID' })
    }
    res.status(200).json(SUCCESS_DELETED)
  } catch (error) {
    throw ERROR_DELETED
  }
}

const getGpaxOfStudentById = async (req, res) => {
  const { ID } = req.params
  try {
    const { gpa } = await studentModel.findOne({ id: ID })
    //   console.log(gpa)
    const allGrades = gpa.map((item) =>
    //   console.log(item.gpa)
      item.gpa)
    console.log(allGrades)
    //   console.log(allGrades.length)
    //* reduce used to reduce the array to a single value and executes a provided function for each value of the array (from left-to-right) and the return value of the function is stored in an accumulator
    //* array.reduce( function(total, currentValue, currentIndex (optional), arr (optional)), initialValue )
    //* total (required) specify the initialValue, or the previously returned value of the function.
    //* currentValue (required) specify the value of the current element.
    const gpax = allGrades.reduce((partialSum, a) => partialSum + a, 0) / allGrades.length
    res.status(200).json({ GPAX: gpax })
  } catch (error) {
    // console.log('noooo')
    throw NOT_FOUND_DATA
  }
}

export default {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudentById,
  deleteStudentById,
  getGpaxOfStudentById,
}
