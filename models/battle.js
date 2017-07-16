'use strict';

const {Knight} = require('./knight');

class Battle {
  _isValid(aGameId, aKnight) {
    return typeof aGameId === 'number' &&
      aKnight instanceof Knight;
  }

  constructor(...aParameters) {
    let gameId, knight;

    if (aParameters.length === 1 && typeof aParameters[0] === 'object') {
      const battle = aParameters[0];
      gameId = battle.gameId;
      knight = new Knight(battle.knight);
    } else {
      [gameId, knight] = aParameters;
    }

    if (!this._isValid(gameId, knight)) {
      throw new Error('Invalid parameters for Battle model.');
    }

    this.gameId = gameId;
    this.knight = knight;
  }
}

module.exports.Battle = Battle;
