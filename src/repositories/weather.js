'use strict';

const axios = require('axios');
const xml2js = require('xml2js');

async function get(aGameId) {
  if (typeof aGameId !== 'number') {
    throw new Error('Invalid gameId.');
  }

  const response = await axios({
    method: 'get',
    url: 'http://www.dragonsofmugloar.com/weather/api/report/' + aGameId,
    responseType: 'text'
  });

  return new Promise((aResolve, aReject) => {
    xml2js.parseString(response.data, {explicitArray: false}, (aError, aResult) => {
      if (aError) {
        aReject(aError);
      } else {
        aResolve(aResult);
      }
    });
  });
}

module.exports.get = get;
