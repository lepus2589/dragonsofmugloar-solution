'use strict';

const axios = require('axios');
const {Attack, Outcome} = require('../models');

async function attack(aGameId, aAttack) {
  if (typeof aGameId !== 'number') {
    throw new Error('Invalid gameId.');
  }

  if (!(aAttack instanceof Attack)) {
    throw new Error('Invalid attack payload.');
  }

  const response = await axios({
    method: 'put',
    url: 'http://www.dragonsofmugloar.com/api/game/' + aGameId + '/solution',
    responseType: 'json',
    data: aAttack
  });

  return new Outcome(response.data);;
}

module.exports.attack = attack;
