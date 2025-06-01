import {Knight} from './knight.js';

describe('Knight model: ', function () {
  describe('The valid Knight model', function () {
    let knight;

    beforeEach(function () {
      knight = new Knight('Sir Galahad', 5, 5, 5, 5);
    });

    it('should have a property "name" of type String', function () {
      expect(knight.name).to.be.a('string');
      expect(knight.name).not.to.be.empty;
    });

    it('should have a property "attack" of type Number', function () {
      expect(knight.attack).to.be.a('number');
    });

    it('should have a property "armor" of type Number', function () {
      expect(knight.armor).to.be.a('number');
    });

    it('should have a property "agility" of type Number', function () {
      expect(knight.agility).to.be.a('number');
    });

    it('should have a property "endurance" of type Number', function () {
      expect(knight.endurance).to.be.a('number');
    });
  });

  describe('The instantiation', function () {
    function createKnight(...aParameters) {
      return new Knight(...aParameters);
    }

    it('should work if separate arguments are provided', function () {
      expect(createKnight.bind(this, 'Sir Galahad', 5, 5, 5, 5)).not.to.throw();
    });

    it('should work if a parameter object is provided', function () {
      expect(createKnight.bind(this, {
        name: 'Sir Galahad',
        attack: 5,
        armor: 5,
        agility: 5,
        endurance: 5
      })).not.to.throw();
    });

    it('should fail if "name" is not of type String', function () {
      expect(createKnight.bind(this, undefined, 5, 5, 5, 5)).to.throw();
      expect(createKnight.bind(this, {
        attack: 5,
        armor: 5,
        agility: 5,
        endurance: 5
      })).to.throw();
    });

    it('should fail if "name" is an empty String', function () {
      expect(createKnight.bind(this, '', 5, 5, 5, 5)).to.throw();
      expect(createKnight.bind(this, {
        name: '',
        attack: 5,
        armor: 5,
        agility: 5,
        endurance: 5
      })).to.throw();
    });

    it('should fail if "attack" is not of type Number', function () {
      expect(createKnight.bind(this, 'Sir Galahad', undefined, 5, 5, 5)).to.throw();
      expect(createKnight.bind(this, {
        name: 'Sir Galahad',
        armor: 5,
        agility: 5,
        endurance: 5
      })).to.throw();
    });

    it('should fail if "armor" is not of type Number', function () {
      expect(createKnight.bind(this, 'Sir Galahad', 5, undefined, 5, 5)).to.throw();
      expect(createKnight.bind(this, {
        name: 'Sir Galahad',
        attack: 5,
        agility: 5,
        endurance: 5
      })).to.throw();
    });

    it('should fail if "agility" is not of type Number', function () {
      expect(createKnight.bind(this, 'Sir Galahad', 5, 5, undefined, 5)).to.throw();
      expect(createKnight.bind(this, {
        name: 'Sir Galahad',
        attack: 5,
        armor: 5,
        endurance: 5
      })).to.throw();
    });

    it('should fail if "endurance" is not of type Number', function () {
      expect(createKnight.bind(this, 'Sir Galahad', 5, 5, 5, undefined)).to.throw();
      expect(createKnight.bind(this, {
        name: 'Sir Galahad',
        attack: 5,
        armor: 5,
        agility: 5
      })).to.throw();
    });

    it('should fail if the sum of all abilities does not equal 20', function () {
      const defaultAbilitiesArray = [5, 5, 5, 5];
      const defaultAbilitiesObject = {
        attack: 5,
        armor: 5,
        agility: 5,
        endurance: 5
      };

      [
        'attack',
        'armor',
        'agility',
        'endurance'
      ].forEach(function (aName, aIndex) {
        let abilitiesArray = defaultAbilitiesArray.slice();
        abilitiesArray[aIndex] += Math.ceil(5 * Math.random());
        expect(createKnight.bind(this, 'Sir Galahad', ...abilitiesArray)).to.throw();

        abilitiesArray = defaultAbilitiesArray.slice();
        abilitiesArray[aIndex] -= Math.ceil(5 * Math.random());
        expect(createKnight.bind(this, 'Sir Galahad', ...abilitiesArray)).to.throw();

        let abilitiesObject = Object.assign({}, defaultAbilitiesObject);
        abilitiesObject[aName] += Math.ceil(5 * Math.random());
        expect(createKnight.bind(this, Object.assign({
          name: 'Sir Galahad'
        }, abilitiesObject))).to.throw();

        abilitiesObject = Object.assign({}, defaultAbilitiesObject);
        abilitiesObject[aName] -= Math.ceil(5 * Math.random());
        expect(createKnight.bind(this, Object.assign({
          name: 'Sir Galahad'
        }, abilitiesObject))).to.throw();
      });
    });
  });
});
