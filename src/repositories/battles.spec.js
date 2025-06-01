import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';
import esmock from 'esmock'

describe('battles repository: ', async function () {
  const Battle = sinon.fake();
  const battles = await esmock('./battles.js', {
    '../models/index.js': { Battle }
  });

  before(function () {
    this.axiosMock = new AxiosMockAdapter(axios);
  });

  after(function () {
    this.axiosMock.restore();
  });

  afterEach(function () {
    Battle.resetHistory();
    this.axiosMock.reset();
  });

  describe('The start function', function () {
    it('should succeed with normal server operation', function () {
      const reply = {};

      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/api/game')
        .reply(200, reply);

      const request = battles.start();

      return expect(request).to.eventually.be.an.instanceof(Battle)
        .then(function () {
          expect(Battle).to.have.been.calledWithNew;
          expect(Battle).to.have.been.calledWith(reply);
        });
    });

    it('should fail on connection error', function () {
      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/api/game')
        .reply(500);

      const request = battles.start();

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(Battle).not.to.have.been.called;
        });
    });
  });

  describe('The get function', function () {
    const gameId = 12345;

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

      return expect(request).to.eventually.be.an.instanceof(Battle)
        .then(function () {
          expect(Battle).to.have.been.calledWithNew;
          expect(Battle).to.have.been.calledWith(reply);
        });
    });

    it('should fail with a valid gameId on connection error', function () {
      this.axiosMock
        .onGet('http://www.dragonsofmugloar.com/api/game/' + gameId)
        .reply(500);

      const request = battles.get(gameId);

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(Battle).not.to.have.been.called;
        });
    });
  });
});
