import { app } from '../../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { getAdminCookie } from '../../tests/adminCookie'
import { UserRoles } from '../../common'

chai.use(chaiHttp)

describe('update user', () => {
  it('return a 401 if the user is not authenticated', async () => {
    const id = Math.floor(Math.random() * 10)
    const res = await chai.request(app).put(`/api/users/${id}`).send({
      role: 'admin'
    })
    expect(res).to.have.status(401)
  })
  it('return a 403 if the user is not an admin', async () => {
    const id = Math.floor(Math.random() * 10)

    const res = await chai
      .request(app)
      .put(`/api/users/${id}`)
      .set('Cookie', getAdminCookie(UserRoles.Consumer))
      .send({
        role: 'user'
      })
    expect(res).to.have.status(403)
  })
  it('return a 404 if the provided id does not exist', async () => {
    const id = Math.floor(Math.random() * 10)
    const cookie = getAdminCookie(UserRoles.Admin)

    const res = await chai.request(app).put(`/api/users/${id}`).set('Cookie', cookie).send({
      role: 'admin'
    })
    expect(res).to.have.status(404)
  })

  it('return a 400 if role provided is invalid', async () => {
    const cookie = getAdminCookie(UserRoles.Admin)
    const user = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const res = await chai
      .request(app)
      .put(`/api/users/${user.body.id}`)
      .set('Cookie', cookie)
      .send({
        role: 'administrator'
      })
    expect(res).to.have.status(400)
    expect(res.body.errors[0].message).to.eql('Invalid role provided...')
  })

  it('allows an admin user to update a role', async () => {
    const cookie = getAdminCookie(UserRoles.Admin)
    const user = await chai.request(app).post('/api/users/signup').send({
      email: 'test@test.com',
      password: 'password'
    })
    expect(user).to.have.status(201)
    const res = await chai
      .request(app)
      .put(`/api/users/${user.body.id}`)
      .set('Cookie', cookie)
      .send({
        role: UserRoles.Admin
      })
    expect(res).to.have.status(200)
    expect(res.body.role).to.eql(UserRoles.Admin)
    expect(res.body.email).to.eql('test@test.com')
  })
})
