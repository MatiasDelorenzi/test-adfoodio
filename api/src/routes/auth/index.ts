import express, { Request, Response } from 'express'
import { validateAdmin, requireAuth } from '../../common'
import { connect } from '../../database'

const router = express.Router()

router.get('/api/users', requireAuth, validateAdmin, async (req: Request, res: Response) => {
  const connection = await connect()
  const Users = await connection.query('SELECT * FROM users')
  res.send(Users)
})

export { router as getUserRouter }
