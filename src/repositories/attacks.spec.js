'use strict';

const attacks = require('./attacks');
const models = require('../models');
const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const sinon = require('sinon');

models.Attack = function () {};

describe('attacks repository: ', function () {
  before(function () {
    this.axiosMock = new AxiosMockAdapter(axios);
  });

  after(function () {
    this.axiosMock.restore();
  });

  beforeEach(function () {
    this.sinon = sinon.sandbox.create();
  });

  afterEach(function () {
    this.sinon.restore();
    this.axiosMock.reset();
  });

  describe('The attack function', function () {
    const gameId = 12345;
    const attackModel = new models.Attack();

    beforeEach(function () {
      this.sinon.stub(models, 'Outcome').callsFake(function () {});
    });

    it('should fail without a valid gameId', function () {
      this.axiosMock.onAny().reply(expect.fail);

      return expect(attacks.attack(undefined, attackModel))
        .to.eventually.rejectedWith('Invalid gameId.');
    });

    it('should fail without a valid Attack model', function () {
      this.axiosMock.onAny().reply(expect.fail);

      return expect(attacks.attack(gameId, {}))
        .to.eventually.rejectedWith('Invalid attack payload.');
    });

    it('should succeed with a valid gameId and Attack model', function () {
      const reply = {};

      this.axiosMock
        .onPut('http://www.dragonsofmugloar.com/api/game/' + gameId + '/solution')
        .reply(200, reply);

      const request = attacks.attack(gameId, attackModel);

      return expect(request).to.eventually.be.an.instanceof(models.Outcome)
        .then(function () {
          expect(models.Outcome).to.have.been.calledWithNew;
          expect(models.Outcome).to.have.been.calledWith(reply);
        });
    });

    it('should fail with a valid gameId and Attack model on connection error', function () {
      this.axiosMock
        .onPut('http://www.dragonsofmugloar.com/api/game/' + gameId + '/solution')
        .reply(500);

      const request = attacks.attack(gameId, attackModel);

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(models.Outcome).not.to.have.been.called;
        });
    });
  });
});
