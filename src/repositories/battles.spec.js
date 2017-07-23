'use strict';

const battles = require('./battles');
const models = require('../models');
const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const sinon = require('sinon');

describe('battles repository: ', function () {
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

  describe('The start function', function () {
    beforeEach(function () {
      this.sinon.stub(models, 'Battle').callsFake(function () {});
    });

    it('should succeed with normal server operation', function () {
      const reply = {};

      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/api/game')
        .reply(200, reply);

      const request = battles.start();

      return expect(request).to.eventually.be.an.instanceof(models.Battle)
        .then(function () {
          expect(models.Battle).to.have.been.calledWithNew;
          expect(models.Battle).to.have.been.calledWith(reply);
        });
    });

    it('should fail on connection error', function () {
      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/api/game')
        .reply(500);

      const request = battles.start();

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(models.Battle).not.to.have.been.called;
        });
    });
  });

  describe('The get function', function () {
    const gameId = 12345;

    beforeEach(function () {
      this.sinon.stub(models, 'Battle').callsFake(function () {});
    });

    it('should fail without a valid gameId', function () {
      this.axiosMock.onAny().reply(expect.fail);

      return expect(battles.get(undefined))
        .to.eventually.be.rejectedWith('Invalid gameId.');
    });

    it('should succeed with a valid gameId', function () {
      const reply = {};

      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/api/game/' + gameId)
        .reply(200, reply);

      const request = battles.get(gameId);

      return expect(request).to.eventually.be.an.instanceof(models.Battle)
        .then(function () {
          expect(models.Battle).to.have.been.calledWithNew;
          expect(models.Battle).to.have.been.calledWith(reply);
        });
    });

    it('should fail with a valid gameId on connection error', function () {
      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/api/game/' + gameId)
        .reply(500);

      const request = battles.get(gameId);

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(models.Battle).not.to.have.been.called;
        });
    });
  });
});
