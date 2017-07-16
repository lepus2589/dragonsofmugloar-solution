'use strict';

const axios = require('axios');
const {Battle} = require('../models');

async function start() {
  const response = await axios({
    method: 'get',
    url: 'http://www.dragonsofmugloar.com/api/game',
    responseType: 'json'
  });

  return new Battle(response.data);
}

async function get(aGameId) {
  if (typeof aGameId !== 'number') {
    throw new Error('Invalid gameId.');
  }

  const response = await axios({
    method: 'get',
    url: 'http://www.dragonsofmugloar.com/api/game/' + aGameId,
    responseType: 'json'
  });

  return new Battle(response.data);
}

module.exports.start = start;
module.exports.get = get;
