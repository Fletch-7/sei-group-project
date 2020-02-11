/* global api, describe, it, expect, beforeEach, afterEach */
const Trail = require('../../models/trail')
const User = require('../../models/user')

describe('GET /trails/:id', () => {

  let trail

  beforeEach(done => {
    User.create({
      username: 'Rory',
      email: 'Rory@email',
      password: 'pass',
      passwordConfirmation: 'pass'
    })
      .then(user => {
        return Trail.create({
          name: 'Ensnared',
          directions: 'E11 1PE',
          clueOne: ' A man with a knife, similar but not quite.',
          clueTwo: 'Feast here, you might.',
          clueThree: 'Not a trap but a snare with brook that\'s not near.',
          image: 'https://s3.geograph.org.uk/geophotos/04/68/12/4681299_c93298e5_1024x1024.jpg',
          weatherFactor: true,
          user
        })
      })
      .then(createdTrail => {
        trail = createdTrail  
        done()
      })
  })

  afterEach(done => {
    User.deleteMany()
      .then(() => Trail.deleteMany())
      .then(() => done())
  })

  it('should return a 404 not found for an invalid trail id', done => {
    api.get('/api/trails/1234')
      .end((err, res) => {
        expect(res.status).to.eq(404)
        done()
      })
  })

  it('should return a 200 response', done => {
    api.get(`/api/trails/${trail._id}`) 
      .end((err, res) => {
        expect(res.status).to.eq(200)
        done()
      })
  })

  it('should return an object', done => {
    api.get(`/api/trails/${trail._id}`) 
      .end((err, res) => {
        expect(res.body).to.be.an('object')
        done()
      })
  })

  it('should return the correct fields', done => {
    api.get(`/api/trails/${trail._id}`)
      .end((err, res) => {
        expect(res.body).to.contains.keys([
          'name',
          'directions',
          'clueOne',
          'clueTwo',
          'clueThree',
          'image',
          'weatherFactor',
          'user'
        ])
        done()
      })
  })

  it('should return the correct data types', done => {
    api.get(`/api/trails/${trail._id}`)
      .end((err, res) => {
        const trail = res.body
        expect(trail.name).to.be.a('string')
        expect(trail.directions).to.be.a('string')
        expect(trail.clueOne).to.be.a('string')
        expect(trail.clueTwo).to.be.a('string')
        expect(trail.clueThree).to.be.a('string')
        expect(trail.image).to.be.a('string')
        expect(trail.weatherFactor).to.be.a('boolean')
        expect(trail.user).to.be.an('object')
        done()
      })
  })
})
