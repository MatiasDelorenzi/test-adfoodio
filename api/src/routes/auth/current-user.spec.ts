import { app } from '../../app'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { getAdminCookie } from '../../tests/adminCookie'
import { UserRoles } from '../../common'

chai.use(chaiHttp)

describe('current user', () => {
  it('response with details of current user', async () => {
    const cookie = getAdminCookie(UserRoles.Admin)
    const user = await chai.request(app).get('/api/users/currentuser').set('Cookie', cookie)
    expect(user.body.currentUser.email).to.eql('admin@test.com')
  })
})
