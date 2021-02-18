import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError, ForbidenError } from '..'
import { UserRoles } from '../types/users'

export const validateConsumer = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError('Not authorized')
  }
  const hasAccess = Object.values(UserRoles)
    .filter((role) => role !== UserRoles.Consumer)
    .includes(req.currentUser.role)
  if (!hasAccess) {
    throw new ForbidenError('Operation Not authorized')
  }
  next()
}
