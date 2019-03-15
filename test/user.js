process.env.NODE_ENV = 'test'
const User = require('../schema/user')

//Require the dev-dependencies
import chai from 'chai'
import server from '../index'
const should = chai.should()
import Chance from 'chance'
const chance = new Chance()
import jwt from 'jsonwebtoken'
chai.use(require('chai-http'))

describe('/GET login', () => {
  describe('Fail tests', () => {
    it('it should have status(400) with missing login', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({password: chance.string()})
        .end((err, res) => {
          res.body.should.be.eql({ message: 'login and/or password missing' })
          res.should.have.status(400)
          done();
        });
    })
    it('it should have status(400) with missing password', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({login: chance.string({})})
        .end((err, res) => {
          res.body.should.be.eql({ message: 'login and/or password missing' })
          res.should.have.status(400)
          done();
        });
    })
    it('it should have status(404) with user who does not exist', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({login: 'jordan',password: chance.string({})})
        .end((err, res) => {
          res.body.should.be.eql({ message: 'user not found' })
          res.should.have.status(404)
          done();
        });
    })
    it('it should have status(401) with user exist but wrong password', (done) => {
      chai.request(server).post('/users/login')
        .send({login: 'john',password: chance.string({})})
        .end((err, res) => {
          res.body.should.be.eql({ message: 'password incorrect' })
          res.should.have.status(401)
          done();
        });
    })

  })
  describe('Success tests', () => {
    it('it should have status(200) with good credentials', (done) => {
      chai.request(server)
        .post('/users/login')
        .send({login: 'john', password: 'myfonciapassword' })
        .end((err, res) => {
          res.body.message.should.be.eql('login success' )
          res.body.should.to.have.property('token')
          res.should.have.status(200)
          done()
        })
    })
  })
})

