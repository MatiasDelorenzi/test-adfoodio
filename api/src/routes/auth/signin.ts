import express, { Request, Response } from 'express'
const router = express.Router()
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { validateRequest, BadRequestError } from '../../common'
import { Password } from '../../services/password'
import { connect } from '../../database'

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const connection = await connect()
    const existingUser = await connection.query('SELECT * FROM users WHERE email =?', email)

    if (!existingUser) {
      throw new BadRequestError('Invalid email or password')
    }
    console.log('EXISTING USER ======================================')
    console.log(existingUser)

    // const passwordMatch = await Password.compare(existingUser.password, password)

    // if (!passwordMatch) {
    //   throw new BadRequestError('Invalid eamil or password')
    // }

    // const userJwt = jwt.sign(
    //   {
    //     id: existingUser.id,
    //     email: existingUser.email,
    //     role: existingUser.role
    //   },
    //   process.env.JWT_KEY!
    // )

    // req.session = {
    //   jwt: userJwt
    // }
    res.status(200).send(existingUser)
  }
)

export { router as signinRouter }
