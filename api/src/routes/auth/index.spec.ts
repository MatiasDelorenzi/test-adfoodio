import { app } from '../../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { getAdminCookie } from '../../tests/adminCookie'
import { UserRoles } from '../../common'

chai.use(chaiHttp)

describe('get users', () => {
  it('has a route listener for get requests at /api/users', async () => {
    const res = await chai.request(app).get('/api/users').send({})
    expect(res).not.to.have.status(404)
  })

  it('responds to authenticated users', async () => {
    const res = await chai.request(app).get('/api/users').send({})
    expect(res).to.have.status(401)
  })

  it('satisfactory request only Admin', async () => {
    const res = await chai
      .request(app)
      .get('/api/users')
      .set('Cookie', getAdminCookie(UserRoles.Admin))
      .send({})
    expect(res).to.have.status(200)
    expect(res.body).to.be.a('array')
  })
  it('responds to not authorized users', async () => {
    const res = await chai
      .request(app)
      .get('/api/users')
      .set('Cookie', getAdminCookie(UserRoles.Consumer))
      .send({})
    expect(res).to.have.status(403)
  })
})
