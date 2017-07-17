'use strict';

const {Dragon} = require('./dragon');

describe('Dragon model: ', function () {
  describe('The valid Dragon model', function () {
    let dragon;

    beforeEach(function () {
      dragon = new Dragon(5, 5, 5, 5);
    });

    it('should have a property "scaleThickness" of type Number', function () {
      expect(dragon.scaleThickness).to.be.a('number');
    });

    it('should have a property "clawSharpness" of type Number', function () {
      expect(dragon.clawSharpness).to.be.a('number');
    });

    it('should have a property "wingStrength" of type Number', function () {
      expect(dragon.wingStrength).to.be.a('number');
    });

    it('should have a property "fireBreath" of type Number', function () {
      expect(dragon.fireBreath).to.be.a('number');
    });
  });

  describe('The instantiation', function () {
    function createDragon(...aParameters) {
      return new Dragon(...aParameters);
    }

    it('should work if separate arguments are provided', function () {
      expect(createDragon.bind(this, 5, 5, 5, 5)).not.to.throw();
    });

    it('should work if a parameter object is provided', function () {
      expect(createDragon.bind(this, {
        scaleThickness: 5,
        clawSharpness: 5,
        wingStrength: 5,
        fireBreath: 5
      })).not.to.throw();
    });

    it('should fail if "scaleThickness" is not of type Number', function () {
      expect(createDragon.bind(this, undefined, 5, 5, 5)).to.throw();
      expect(createDragon.bind(this, {
        clawSharpness: 5,
        wingStrength: 5,
        fireBreath: 5
      })).to.throw();
    });

    it('should fail if "clawSharpness" is not of type Number', function () {
      expect(createDragon.bind(this, 5, undefined, 5, 5)).to.throw();
      expect(createDragon.bind(this, {
        scaleThickness: 5,
        wingStrength: 5,
        fireBreath: 5
      })).to.throw();
    });

    it('should fail if "wingStrength" is not of type Number', function () {
      expect(createDragon.bind(this, 5, 5, undefined, 5)).to.throw();
      expect(createDragon.bind(this, {
        scaleThickness: 5,
        clawSharpness: 5,
        fireBreath: 5
      })).to.throw();
    });

    it('should fail if "fireBreath" is not of type Number', function () {
      expect(createDragon.bind(this, 5, 5, 5, undefined)).to.throw();
      expect(createDragon.bind(this, {
        scaleThickness: 5,
        clawSharpness: 5,
        wingStrength: 5
      })).to.throw();
    });

    it('should fail if the sum of all abilities does not equal 20', function () {
      const defaultAbilitiesArray = [5, 5, 5, 5];
      const defaultAbilitiesObject = {
        scaleThickness: 5,
        clawSharpness: 5,
        wingStrength: 5,
        fireBreath: 5
      };

      [
        'scaleThickness',
        'clawSharpness',
        'wingStrength',
        'fireBreath'
      ].forEach(function (aName, aIndex) {
        let abilitiesArray = defaultAbilitiesArray.slice();
        abilitiesArray[aIndex] += Math.ceil(5 * Math.random());
        expect(createDragon.bind(this, ...abilitiesArray)).to.throw();

        abilitiesArray = defaultAbilitiesArray.slice();
        abilitiesArray[aIndex] -= Math.ceil(5 * Math.random());
        expect(createDragon.bind(this, ...abilitiesArray)).to.throw();

        let abilitiesObject = Object.assign({}, defaultAbilitiesObject);
        abilitiesObject[aName] += Math.ceil(5 * Math.random());
        expect(createDragon.bind(this, abilitiesObject)).to.throw();

        abilitiesObject = Object.assign({}, defaultAbilitiesObject);
        abilitiesObject[aName] -= Math.ceil(5 * Math.random());
        expect(createDragon.bind(this, abilitiesObject)).to.throw();
      });
    });
  });
});
