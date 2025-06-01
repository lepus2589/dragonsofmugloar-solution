import axios from 'axios';
import * as models from '../models/index.js';

async function attack(aGameId, aAttack) {
  if (typeof aGameId !== 'number') {
    throw new Error('Invalid gameId.');
  }

  if (!(aAttack instanceof models.Attack)) {
    throw new Error('Invalid attack payload.');
  }

  const response = await axios({
    method: 'put',
    url: 'https://www.dragonsofmugloar.com/api/game/' + aGameId + '/solution',
    responseType: 'json',
    data: aAttack
  });

  return new models.Outcome(response.data);
}

export {attack};
