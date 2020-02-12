/* global api, describe, it, expect, beforeEach, afterEach */
<<<<<<< HEAD
=======

>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
const Trail = require('../../models/trail')
const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../../config/environment')

const testUserData = [{
  username: 'test',
  email: 'test@email',
  password: 'test',
  passwordConfirmation: 'test'
}, {
  username: 'testTwo',
  email: 'testTwo@email',
  password: 'test',
  passwordConfirmation: 'test'
}]

describe('DELETE /trails/:id', () => {
  let token = null
<<<<<<< HEAD

  let incorrectToken = null
  let trail = null

=======
  let incorrectToken = null
  let trail = null
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
  beforeEach(done => {
    User.create(testUserData)
      .then(users => {
        token = jwt.sign({ sub: users[0]._id }, secret, { expiresIn: '6h' })
<<<<<<< HEAD

=======
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
        incorrectToken = jwt.sign({ sub: users[1]._id }, secret, { expiresIn: '6h' })
        return Trail.create({
          name: 'Murky Depths',
          directions: 'E17 5QZ',
          clueOne: 'Here is wet but do not drink',
          clueTwo: 'The water is green and has a stink',
          clueThree: 'Look for the sign that makes you think',
          image: 'https://s0.geograph.org.uk/geophotos/05/74/40/5744078_4accef57.jpg',
          weatherFactor: true,
          user: users[0]
        })
      })
      .then(createdtrail => {
        trail = createdtrail
        done()
      })
  })
<<<<<<< HEAD

=======
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
  afterEach(done => {
    User.deleteMany()
      .then(() => Trail.deleteMany())
      .then(() => done())
  })
<<<<<<< HEAD

=======
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
  it('should return a 401 response without a token', done => {
    api.delete(`/api/trails/${trail._id}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
<<<<<<< HEAD

=======
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
  it('should return a 204 response with a token', done => {
    api.delete(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(204)
        done()
      })
  })
<<<<<<< HEAD

=======
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
  it('should return no data', done => {
    api.delete(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.body).to.deep.eq({})
        done()
      })
  })
<<<<<<< HEAD

=======
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
  it('should return a 401 response with a token for a user that did not create the resource', done => {
    api.delete(`/api/trails/${trail._id}`)
      .set('Authorization', `Bearer ${incorrectToken}`)
      .end((err, res) => {
        expect(res.status).to.eq(401)
        done()
      })
  })
<<<<<<< HEAD

=======
>>>>>>> 4a5c44fb82db36116cba5d5c938581a14338c931
})