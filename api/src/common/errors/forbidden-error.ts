import { CustomError } from './custom-error'

export class ForbidenError extends CustomError {
  statusCode = 403
  constructor(public message: string) {
    super(message)

    Object.setPrototypeOf(this, ForbidenError.prototype)
  }
  serializeErrors() {
    return [{ message: this.message }]
  }
}
