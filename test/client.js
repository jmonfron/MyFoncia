process.env.NODE_ENV = 'test'
const User = require('../schema/user')

//Require the dev-dependencies
import chai from 'chai'
import server from '../index'
import Chance from 'chance'
import jwt from 'jsonwebtoken'

const chance = new Chance()
chai.use(require('chai-http'))

describe('/GET clients', () => {
  describe('Fail tests', () => {
    it('it should have status(401) with missing authorization', (done) => {
      chai.request(server)
        .get('/clients')
        .set('asodk', 'nada')
        .end((err, res) => {
          res.should.have.status(401)
          done();
        });
    })
    it('it should have status(401) with headers authorization but wrong value', (done) => {
      chai.request(server)
        .get('/clients')
        .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c')
        .end((err, res) => {
          res.should.have.status(401)
          done();
        });
    })

    describe('Success tests', () => {
      it('it should have status(200) with only params page', (done) => {
        const page = chance.integer({min: 1, max: 10})
        chai.request(server)
          .get(`/clients?page=${page}`)
          .set('authorization', jwt.sign({ foo: 'bar' },'random_key_for_jwt_token'))
          .end((err, res) => {
            res.body.result.should.have.property('page', page)
            res.should.have.status(200)
            done()
          })
      })
      it('it should have status(200) with only params number', (done) => {
        const number = chance.integer({min: 1, max: 10})
        chai.request(server)
          .get(`/clients?number=${number}`)
          .set('authorization', jwt.sign({ foo: 'bar' },'random_key_for_jwt_token'))
          .end((err, res) => {
            res.body.result.should.have.property('numberOfResult', number)
            res.should.have.status(200)
            done()
          })
      })
      it('it should have status(200) with only params number and page', (done) => {
        const number = 3
        const page = 2
        chai.request(server)
          .get(`/clients?number=${number}&page=${page}`)
          .set('authorization', jwt.sign({ foo: 'bar' },'random_key_for_jwt_token'))
          .end((err, res) => {
            res.body.result.should.have.property('numberOfResult', number)
            res.body.result.should.have.property('page', page)
            res.should.have.status(200)
            done()
          })
      })
    })
  })
})

