import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';
import sinon from 'sinon';
import esmock from 'esmock'

describe('attacks repository: ', async function () {
  const Attack = sinon.fake();
  const Outcome = sinon.fake();
  const attacks = await esmock('./attacks.js', {
    '../models/index.js': {
      Attack,
      Outcome
    }
  });

  before(function () {
    this.axiosMock = new AxiosMockAdapter(axios);
  });

  after(function () {
    this.axiosMock.restore();
  });

  afterEach(function () {
    Attack.resetHistory()
    Outcome.resetHistory()
    this.axiosMock.reset();
  });

  describe('The attack function', function () {
    const gameId = 12345;
    const attackModel = new Attack();

    it('should fail without a valid gameId', function () {
      this.axiosMock.onAny().reply(expect.fail);

      return expect(attacks.attack(undefined, attackModel))
        .to.eventually.be.rejectedWith('Invalid gameId.');
    });

    it('should fail without a valid Attack model', function () {
      this.axiosMock.onAny().reply(expect.fail);

      return expect(attacks.attack(gameId, {}))
        .to.eventually.be.rejectedWith('Invalid attack payload.');
    });

    it('should succeed with a valid gameId and Attack model', function () {
      const reply = {};

      this.axiosMock
        .onPut('http://www.dragonsofmugloar.com/api/game/' + gameId + '/solution')
        .reply(200, reply);

      const request = attacks.attack(gameId, attackModel);

      return expect(request).to.eventually.be.an.instanceof(Outcome)
        .then(function () {
          expect(Outcome).to.have.been.calledWithNew;
          expect(Outcome).to.have.been.calledWith(reply);
        });
    });

    it('should fail with a valid gameId and Attack model on connection error', function () {
      this.axiosMock
        .onPut('http://www.dragonsofmugloar.com/api/game/' + gameId + '/solution')
        .reply(500);

      const request = attacks.attack(gameId, attackModel);

      return expect(request).to.eventually.be.rejected
        .then(function () {
          expect(Outcome).not.to.have.been.called;
        });
    });
  });
});
