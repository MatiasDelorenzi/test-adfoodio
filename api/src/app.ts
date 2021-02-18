const morgan = require('morgan')
import fs from 'fs'
import path from 'path'
import express, { Request, Response } from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'
import { errorHandler, NotFoundError, currentUser } from './common'
// import { currentUserRouter } from './routes/auth/current-user'
// import { signinRouter } from './routes/auth/signin'
// import { signupRouter } from './routes/auth/signup'
// import { signoutRouter } from './routes/auth/signout'
// import { updateUserRouter } from './routes/auth/update-user'
// import { getUserRouter } from './routes/auth/index'

// import { indexPlatformRouter } from './routes/platform/index'
// import { newPlatformRouter } from './routes/platform/new'
// import { updatePlatformRouter } from './routes/platform/update'
// import { showPlatformRouter } from './routes/platform/show'
// import { indexUploadRouter } from './routes/uploads'

const app = express()
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

app.set('trust proxy', true)
app.use(json())
app.use(
  cookieSession({
    signed: false,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })
)

app.use(morgan('dev'))

app.use(
  morgan('combined', {
    stream: accessLogStream
  })
)
app.use(currentUser)
// app.use(currentUserRouter)
// app.use(signoutRouter)
// app.use(signinRouter)
// app.use(signupRouter)
// app.use(updateUserRouter)
// app.use(getUserRouter)

// app.use(indexPlatformRouter)
// app.use(newPlatformRouter)
// app.use(updatePlatformRouter)
// app.use(showPlatformRouter)

// app.use(indexUploadRouter)
app.get('/api', (req, res) => {
  res.json({ status: 'success', message: 'Welcome To Testing API' })
})

app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
