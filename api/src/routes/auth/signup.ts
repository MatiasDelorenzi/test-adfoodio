import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { connect } from '../../database'
import { BadRequestError, validateRequest } from '../../common'
import { UserRoles } from '../../common'
import jwt from 'jsonwebtoken'
import { Password } from '../../services/password'

const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
    const connection = await connect()
    const existingUser = await connection.query('SELECT * FROM users WHERE email =?', email)
    if (existingUser) {
      throw new BadRequestError('Email already in use')
    }
    const user = await connection.query(
      `INSERT INTO users (email, password, role) VALUES (${email}, ${Password.toHash(
        password
      )}, 'consumer')`
    )

    console.log('USER ==============================')
    console.log(user)
    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //     role: user.role
    //   },
    //   process.env.JWT_KEY!
    // )

    req.session = null

    res.status(201).send(user)
  }
)

export { router as signupRouter }
