import { app } from './app'
import { connect } from './database'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.MYSQL_URI) {
    throw new Error('MYSQL_URI must be defined')
  }
  const validateConnection = connect()
  if (!validateConnection) {
    console.log("Couldn't connect to database")
  } else {
    console.log('DB is connected')
  }
  app.set('port', process.env.NODE_PORT || 4848)
  app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`)
  })
}

start()
