'use strict';

const {Attack} = require('./attack');
const models = require('.');

models.Dragon = function (aDragon) {
  if (aDragon.invalid) {
    throw new Error();
  }
};

describe('Attack model: ', function () {
  describe('The valid Attack model', function () {
    let attack;

    beforeEach(function () {
      attack = new Attack(new models.Dragon({}));
    });

    it('should have a property "dragon" that is instance of Dragon', function () {
      expect(attack.dragon).to.be.an.instanceof(models.Dragon);
    });
  });

  describe('The instantiation', function () {
    function createAttack(...aParameters) {
      return new Attack(...aParameters);
    }

    it('should work if separate arguments are provided', function () {
      expect(createAttack.bind(this, new models.Dragon({}))).not.to.throw();
    });

    it('should work if a parameter object is provided', function () {
      expect(createAttack.bind(this, {
        dragon: {}
      })).not.to.throw();
    });

    it('should fail if "dragon" is not of type Dragon', function () {
      expect(createAttack.bind(this, undefined)).to.throw();
      expect(createAttack.bind(this, {
        dragon: {invalid: true}
      })).to.throw();
    });
  });
});
