import * as enums from './enums/index.js';

function stringifyBattle(aWeather, aBattle, aAttack, aOutcome) {
  let result = '';

  result += 'The battle took place ';

  switch (aWeather.report.code) {
    case enums.WeatherType.NORMAL:
      result += 'in normal weather';
      break;
    case enums.WeatherType.FOG:
      result += 'in dense fog';
      break;
    case enums.WeatherType.DROUGHT:
      result += 'during the Long Dry';
      break;
    case enums.WeatherType.RAIN:
      result += 'in heavy rain';
      break;
    case enums.WeatherType.STORM:
      result += 'during a storm';
      break;
    default:
      result += 'in unknown weather';
      break;
  }

  result += '.\n\n';

  result += 'The knight was ' + aBattle.knight.name + ':\n';
  result += '\t- Attack: ' + aBattle.knight.attack + '\n';
  result += '\t- Armor: ' + aBattle.knight.armor + '\n';
  result += '\t- Agility: ' + aBattle.knight.agility + '\n';
  result += '\t- Endurance: ' + aBattle.knight.endurance + '\n';

  result += '\n';

  result += 'He was engaged by our dragon:\n';
  result += '\t- Scale Thickness: ' + aAttack.dragon.scaleThickness + '\n';
  result += '\t- Claw Sharpness: ' + aAttack.dragon.clawSharpness + '\n';
  result += '\t- Wing Strength: ' + aAttack.dragon.wingStrength + '\n';
  result += '\t- Fire Breath: ' + aAttack.dragon.fireBreath + '\n';

  result += '\n';

  result += 'The outcome was a ' + aOutcome.status + ' for our dragon.\n';

  if (aOutcome.status === enums.OutcomeType.DEFEAT ||
      aWeather.report.code !== enums.WeatherType.NORMAL) {
    result += aOutcome.message + '\n';
  }

  result += '\n-------------------------------------------\n';

  return result;
}

export {stringifyBattle};
