import jwt from 'jsonwebtoken'
import userModel from '../models/user'
import {
  NOT_FOUND_DATA, ERROR_CREATION, ERROR_DELETED, ERROR_UPDATED,
} from '../constants/errors/unsuccess'
import {
  SUCCESS_CREATED, SUCCESS_UPDATED, SUCCESS_DELETED,
} from '../constants/success'

const registerUser = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { firstname, lastname, email, password } = req.body
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password,
    })
    // create token
    // const token = user.getSignedJwtToken()
    res.status(200).json({ success: true })
    // sendTokenResponse(user, 200, res)
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // validate email & pw(password)
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: 'Please provide an email and password' })
    }

    // check for user
    const user = await userModel.findOne({ email }).select('+password')

    if (!user) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' })
    }

    // user.testLog()

    // console.log(user)
    // check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid credentials' })
    }

    // create token
    // const token = user.getSignedJwtToken()
    // return res.status(200).json({ success: true, token })

    // call function to create JWT token, send response (like the above 2 lines) and store JWT token to cookie.
    sendTokenResponse(user, 200, res)
  } catch (err) {
    console.log(err)
    return res.status(401).json({ success: false, msg: 'Cannot convert email or password to string' })
  }
}

const sendTokenResponse = (user, statusCode, res) => {
  // create token
  const token = user.getSignedJwtToken()

  // creat options
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 is JWT_COOKIE_EXPRIED
    httpOnly: true,
  }

  //   if (process.env.NODE_ENV === 'production') {
  //     options.secure = true
  //   }

  // send status and set information to cookie and sent to client
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  })
}

const logout = async (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })

  res.status(200).json({
    success: true,
    data: {},
  })
}

const getMe = async (req, res) => {
  try {
    console.log(req)
    console.log(req.cookie)
    console.log(req.headers.authorization)
    const token = req.headers.authorization.split(' ')[1]
    const decode = jwt.verify(token, 'amongus')
    const user = await userModel.findOne(decode.email)
    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    res.status(400).json({ status: false, message: 'No logged in user.' })
  }
}

export default {
  registerUser,
  login,
  logout,
  getMe,
}
