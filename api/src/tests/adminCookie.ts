import jwt from 'jsonwebtoken'
import { UserRoles } from '../common'

export const getAdminCookie = (role: UserRoles): string[] => {
  process.env.JWT_KEY = 'askjlkfjlasfamskjsd'

  const payload = {
    id: 1,
    email: 'admin@test.com',
    password: 'password',
    role
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!)

  const session = { jwt: token }

  const sessionJson = JSON.stringify(session)

  const base64 = Buffer.from(sessionJson).toString('base64')

  return [`express:sess=${base64}`]
}
