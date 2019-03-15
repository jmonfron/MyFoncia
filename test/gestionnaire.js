process.env.NODE_ENV = 'test'
const User = require('../schema/user')

//Require the dev-dependencies
import chai from 'chai'
import server from '../index'
import Chance from 'chance'
import jwt from 'jsonwebtoken'

const chance = new Chance()
chai.use(require('chai-http'))

describe('/GET gestionnaire', () => {
  describe('Fail tests', () => {
    it('it should have status(401) with missing authorization', done => {
      chai.request(server)
        .get('/gestionnaire/fullname')
        .set('asodk', 'nada')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should have status(404) with gestionnaire not found', done => {
      chai.request(server)
        .get('/gestionnaire/FakeGestionnaire')
        .set('authorization', jwt.sign({foo: 'bar'}, 'random_key_for_jwt_token'))
        .end((err, res) => {
          res.should.status(404)
          done()
        })
    })
  })
  describe('Success tests', () => {
    it('it should have status(200) with correct gestionnaire whitout space', done => {
      chai.request(server)
        .get('/gestionnaire/MaximeTerci')
        .set('authorization', jwt.sign({foo: 'bar'}, 'random_key_for_jwt_token'))
        .end((err, res) => {
          res.body.should.not.have.length(0)
          res.should.status(200)
          done()
        })
    })
    it('it should have status(200) with correct gestionnaire whith space', done => {
      chai.request(server)
        .get('/gestionnaire/Maxime%20Terci')
        .set('authorization', jwt.sign({foo: 'bar'}, 'random_key_for_jwt_token'))
        .end((err, res) => {
          res.body.should.not.have.length(0)
          res.should.status(200)
          done()
        })
    })
    it('it should have status(200) with correct gestionnaire whith space but whitout uppercase', done => {
      chai.request(server)
        .get('/gestionnaire/maxime%20terci')
        .set('authorization', jwt.sign({foo: 'bar'}, 'random_key_for_jwt_token'))
        .end((err, res) => {
          res.body.should.not.have.length(0)
          res.should.status(200)
          done()
        })
    })
  })
})

