import * as enums from '../enums/index.js'

class Outcome {
  _isValid(aStatus, aMessage) {
    return (aStatus === enums.OutcomeType.DEFEAT ||
      aStatus === enums.OutcomeType.VICTORY) &&
      typeof aMessage === 'string' &&
      aMessage.length > 0;
  }

  constructor(...aParameters) {
    let status, message;

    if (aParameters.length === 1 && typeof aParameters[0] === 'object') {
      const outcome = aParameters[0];
      status = outcome.status;
      message = outcome.message;
    } else {
      [status, message] = aParameters;
    }

    if (!this._isValid(status, message)) {
      throw new Error('Invalid parameters for Outcome model.');
    }

    this.status = status;
    this.message = message;
  }
}

export {Outcome};
