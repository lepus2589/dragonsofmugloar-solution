'use strict';

const enums = require('../enums');
const {Outcome} = require('./outcome');

describe('Outcome model: ', function () {
  describe('The valid Outcome model', function () {
    let outcome;

    beforeEach(function () {
      outcome = new Outcome(enums.OutcomeType.VICTORY, 'Test message');
    });

    it('should have a property "status" of type String', function () {
      expect(outcome.status).to.be.a('string');
      expect(outcome.status).to.be.oneOf([
        enums.OutcomeType.VICTORY,
        enums.OutcomeType.DEFEAT
      ]);
    });

    it('should have a property "message" of type String', function () {
      expect(outcome.message).to.be.a('string');
      expect(outcome.message).not.to.be.empty;
    });
  });

  describe('The instantiation', function () {
    function createOutcome(...aParameters) {
      return new Outcome(...aParameters);
    }

    it('should work if separate arguments are provided', function () {
      expect(createOutcome.bind(this, enums.OutcomeType.VICTORY, 'Test message')).not.to.throw();
    });

    it('should work if a parameter object is provided', function () {
      expect(createOutcome.bind(this, {
        status: enums.OutcomeType.VICTORY,
        message: 'Test message'
      })).not.to.throw();
    });

    it('should fail if "status" is not of type String', function () {
      expect(createOutcome.bind(this, undefined, 'Test message')).to.throw();
      expect(createOutcome.bind(this, {
        message: 'Test message'
      })).to.throw();
    });

    it('should fail if "status" is in enum OutcomeType', function () {
      expect(createOutcome.bind(this, 'Draw', 5, 5, 5, 5)).to.throw();
      expect(createOutcome.bind(this, {
        status: 'Draw',
        message: 'Test message'
      })).to.throw();
    });

    it('should fail if "message" is not of type String', function () {
      expect(createOutcome.bind(this, enums.OutcomeType.VICTORY, undefined)).to.throw();
      expect(createOutcome.bind(this, {
        status: enums.OutcomeType.VICTORY
      })).to.throw();
    });

    it('should fail if "message" is an empty String', function () {
      expect(createOutcome.bind(this, enums.OutcomeType.VICTORY, '')).to.throw();
      expect(createOutcome.bind(this, {
        status: enums.OutcomeType.VICTORY,
        message: ''
      })).to.throw();
    });
  });
});
