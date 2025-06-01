import sinon from 'sinon';
import esmock from 'esmock'

describe('Attack model: ', async function () {
  const Dragon = sinon.fake(function (aDragon) {
    if (aDragon.invalid) {
      throw new Error();
    }
  });
  const {Attack} = await esmock('./attack.js', {
    './index.js': { Dragon }
  });

  afterEach(function () {
    Dragon.resetHistory();
  });

  describe('The valid Attack model', function () {
    let attack;

    beforeEach(function () {
      attack = new Attack(new Dragon({}));
    });

    it('should have a property "dragon" that is instance of Dragon', function () {
      expect(attack.dragon).to.be.an.instanceof(Dragon);
    });
  });

  describe('The instantiation', function () {
    function createAttack(...aParameters) {
      return new Attack(...aParameters);
    }

    it('should work if separate arguments are provided', function () {
      expect(createAttack.bind(this, new Dragon({}))).not.to.throw();
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
