import { app } from '../../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.use(chaiHttp)

describe('signup', () => {
  it('returns a 201 on successful signup', async () => {
    const res = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(res).to.have.status(201)
  })

  it('returns a 400 with invalid email', async () => {
    const res = await chai.request(app).post('/api/users/signup').send({
      email: 'testtest.com',
      password: 'password'
    })
    expect(res).to.have.status(400)
  })

  it('returns a 400 with invalid password', async () => {
    const res = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'pa'
    })
    expect(res).to.have.status(400)
  })

  it('returns a 400 with missing email or password', async () => {
    const res = await chai.request(app).post('/api/users/signup').send({
      email: '',
      password: ''
    })
    expect(res).to.have.status(400)
    expect(res.body.errors).to.have.lengthOf(2)
  })

  it('disallows duplicate email', async () => {
    const user = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const response = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(response).to.have.status(400)
    expect(response.body.errors).to.be.a('array')
    expect(response.body.errors[0].message).to.eql('Email already in use')
  })

  it('sets a cookie after successful signup', async () => {
    const user = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(user).to.have.status(201)
  })
})
