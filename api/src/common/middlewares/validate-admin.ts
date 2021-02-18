import { Request, Response, NextFunction } from 'express'
import { ForbidenError } from '../errors/forbidden-error'
import { NotAuthorizedError } from '../errors/not-authorized-error'
import { UserRoles } from '../types/users'

export const validateAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError('Not authorized')
  }

  if (req.currentUser.role !== UserRoles.Admin) {
    throw new ForbidenError('Operation Not authorized')
  }
  next()
}
