import axios from 'axios';
import * as models from '../models/index.js';

async function start() {
  const response = await axios({
    method: 'get',
    url: 'https://www.dragonsofmugloar.com/api/game',
    responseType: 'json'
  });

  return new models.Battle(response.data);
}

async function get(aGameId) {
  if (typeof aGameId !== 'number') {
    throw new Error('Invalid gameId.');
  }

  const response = await axios({
    method: 'get',
    url: 'https://www.dragonsofmugloar.com/api/game/' + aGameId,
    responseType: 'json'
  });

  return new models.Battle(response.data);
}

export {
  start,
  get
};
