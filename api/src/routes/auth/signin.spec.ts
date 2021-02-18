import { app } from '../../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('signin', () => {
  it('fails with eamil that does not exist', async () => {
    const res = await chai.request(app).post('/api/users/signin').send({
      email: 'email@email.com',
      password: 'password'
    })
    expect(res).to.have.status(400)
  })

  it('fails with incorrect account password', async () => {
    const user = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const response = await chai.request(app).post('/api/users/signin').send({
      email: 'test@test.com',
      password: 'pass123'
    })
    expect(response).to.have.status(400)
  })

  it('responds with a cookie when provided valid credentials', async () => {
    const user = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const res = await chai.request(app).post('/api/users/signin').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(res.header).to.have.ownProperty('set-cookie')
    expect(res).to.have.status(200)
  })
})
