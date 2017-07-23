'use strict';

const weather = require('./weather');
const xml2js = require('xml2js');
const axios = require('axios');
const AxiosMockAdapter = require('axios-mock-adapter');
const sinon = require('sinon');

describe('weather repository: ', function () {
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

  describe('The get function', function () {
    const gameId = 12345;
    const parseResult = {};
    let parseError = null;

    beforeEach(function () {
      this.sinon
        .stub(xml2js, 'parseString')
        .callsFake(function (aString, aOptions, aCallback) {
          aCallback(parseError, parseResult);
        });
    });

    it('should fail without a valid gameId', function () {
      this.axiosMock.onAny().reply(expect.fail);

      return expect(weather.get(undefined))
        .to.eventually.be.rejectedWith('Invalid gameId.');
    });

    it('should succeed with a valid gameId', function () {
      const reply = 'XML';

      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/weather/api/report/' + gameId)
        .reply(200, reply);

      const request = weather.get(gameId);

      return expect(request).to.eventually.equal(parseResult)
        .then(function () {
          expect(xml2js.parseString).to.have.been.calledWith(reply);
        });
    });

    it('should fail with a valid gameId on connection error', function () {
      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/weather/api/report/' + gameId)
        .reply(500);

      const request = weather.get(gameId);

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(xml2js.parseString).not.to.have.been.called;
        });
    });

    it('should fail with a valid gameId on parse error', function () {
      const reply = 'XML';
      parseError = new Error('Parse error.');

      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/weather/api/report/' + gameId)
        .reply(200, reply);

      const request = weather.get(gameId);

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(xml2js.parseString).to.have.been.calledWith(reply);
        });
    });
  });
});
