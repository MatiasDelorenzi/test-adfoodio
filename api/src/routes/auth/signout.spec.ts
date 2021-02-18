import { app } from '../../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('signout', () => {
  it('returns 200 on singout and clears cookie', async () => {
    const user = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const response = await chai.request(app).get('/api/users/signout').send({})
    expect(response).to.have.status(200)
    expect(response).not.to.have.cookie('sessionid')
  })
})
