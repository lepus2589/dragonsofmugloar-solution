import * as models from './index.js'

class Battle {
  _isValid(aGameId, aKnight) {
    return typeof aGameId === 'number' &&
      aKnight instanceof models.Knight;
  }

  constructor(...aParameters) {
    let gameId, knight;

    if (aParameters.length === 1 && typeof aParameters[0] === 'object') {
      const battle = aParameters[0];
      gameId = battle.gameId;
      knight = new models.Knight(battle.knight);
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

export {Battle};
