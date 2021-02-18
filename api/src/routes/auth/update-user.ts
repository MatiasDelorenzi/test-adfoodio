import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import {
  BadRequestError,
  NotFoundError,
  validateRequest,
  UserRoles,
  validateAdmin,
  requireAuth
} from '../../common'
import { connect } from '../../database'

const router = express.Router()

router.put(
  '/api/users/:userId',
  requireAuth,
  validateAdmin,
  [body('role').not().isEmpty().withMessage('New role is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { userId } = req.params
    const { role } = req.body
    const validRole = Object.values(UserRoles).includes(role)

    if (!validRole) {
      throw new BadRequestError('Invalid role provided...')
    }
    const connection = await connect()
    const user = await connection.query('SELECT * FROM users WHERE id =?', userId)

    if (!user) {
      throw new NotFoundError()
    }

    // user.set({ role })

    // await user.save()

    res.send(user)
  }
)

export { router as updateUserRouter }
