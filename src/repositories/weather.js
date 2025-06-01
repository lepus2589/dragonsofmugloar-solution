import axios from 'axios';
import xml2js from 'xml2js';

async function get(aGameId) {
  if (typeof aGameId !== 'number') {
    throw new Error('Invalid gameId.');
  }

  const response = await axios({
    method: 'get',
    url: 'https://www.dragonsofmugloar.com/weather/api/report/' + aGameId,
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

export {get};
