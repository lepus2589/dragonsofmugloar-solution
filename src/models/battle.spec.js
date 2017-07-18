'use strict';

const {Battle} = require('./battle');
const models = require('.');

models.Knight = function (aKnight) {
  if (aKnight.invalid) {
    throw new Error();
  }
};

describe('Battle model: ', function () {
  describe('The valid Battle model', function () {
    let battle;

    beforeEach(function () {
      battle = new Battle(12345, new models.Knight({}));
    });

    it('should have a property "gameId" of type Number', function () {
      expect(battle.gameId).to.be.a('number');
    });

    it('should have a property "knight" that is instance of Knight', function () {
      expect(battle.knight).to.be.an.instanceof(models.Knight);
    });
  });

  describe('The instantiation', function () {
    function createBattle(...aParameters) {
      return new Battle(...aParameters);
    }

    it('should work if separate arguments are provided', function () {
      expect(createBattle.bind(this, 12345, new models.Knight({}))).not.to.throw();
    });

    it('should work if a parameter object is provided', function () {
      expect(createBattle.bind(this, {
        gameId: 12345,
        knight: {}
      })).not.to.throw();
    });

    it('should fail if "gameId" is not of type Number', function () {
      expect(createBattle.bind(this, undefined, new models.Knight({}))).to.throw();
      expect(createBattle.bind(this, {
        knight: {}
      })).to.throw();
    });

    it('should fail if "knight" is not of type Knight', function () {
      expect(createBattle.bind(this, 12345, undefined)).to.throw();
      expect(createBattle.bind(this, {
        gameId: 12345,
        knight: {invalid: true}
      })).to.throw();
    });
  });
});
