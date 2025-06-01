import * as models from './models/index.js';
import * as enums from './enums/index.js';

function calcDragon(aKnight) {
  const knightAbilities = [
    aKnight.attack, // corresponds to the dragon ability 'scaleThickness'
    aKnight.armor, // corresponds to the dragon ability 'clawSharpness'
    aKnight.agility, // corresponds to the dragon ability 'wingStrength'
    aKnight.endurance, // corresponds to the dragon ability 'fireBreath'
  ];

  // map to index-ability pairs
  const indexedKnightAbilities = knightAbilities.map((aAbility, aIndex) => {
    return {
      key: aIndex,
      value: aAbility
    };
  });

  // so that we can also sort the indices in ascending order of the values
  indexedKnightAbilities.sort((aItem1, aItem2) => {
    return aItem1.value - aItem2.value;
  });

  // and pluck indices and abilities into separate arrays again
  const sortedIndices = indexedKnightAbilities.map(aItem => aItem.key);
  const sortedAbilities = indexedKnightAbilities.map(aItem => aItem.value);
  const modifiers = [0, 0, 0, 0];

  // the corresponding dragon's ability to the knight's max ability must be 2 points higher, if possible
  const maxAbility = sortedAbilities[sortedAbilities.length - 1];
  const indexOfMax = sortedIndices[sortedIndices.length - 1];
  let addedPoints = maxAbility <= 8 ? 2 : 10 - maxAbility;
  modifiers[indexOfMax] = addedPoints;

  // The added points must be taken away somewhere else. The two lowest abilities both loose a point.
  // If one of them is already zero, the second best ability must loose a point instead.
  for (let i = 0; i < sortedAbilities.length - 1; ++i) {
    if (addedPoints > 0) {
      const ability = sortedAbilities[i];
      const index = sortedIndices[i];

      if (ability === 0) {
        continue;
      } else {
        if (i < 2) {
          modifiers[index] = -1;
          --addedPoints;
        } else {
          modifiers[index] = -1 * addedPoints;
          addedPoints = 0;
        }
      }
    } else {
      break;
    }
  }

  // apply the modifiers to the knight's abilities and create a new dragon from the result
  return new models.Dragon(...knightAbilities.map((aAbility, aIndex) => {
    return aAbility + modifiers[aIndex];
  }));
}

function calcRainDragon(aKnight) {
  const normalDragon = calcDragon(aKnight);
  // fire is useless and sharper claws are required
  const clawIncrease = 10 - normalDragon.clawSharpness;
  const fireDecrease = normalDragon.fireBreath;
  let excessPoints = clawIncrease - fireDecrease;
  let scaleModifier = 0;
  let wingModifier = 0;

  // distribute the excess points among the other two abilities
  if (excessPoints >= 0) {
    while(excessPoints > 0) {
      if (normalDragon.scaleThickness - aKnight.attack >= normalDragon.wingStrength - aKnight.agility) {
        --scaleModifier;
      } else {
        --wingModifier;
      }

      --excessPoints;
    }
  } else {
    while(excessPoints < 0) {
      if (normalDragon.scaleThickness - aKnight.attack <= normalDragon.wingStrength - aKnight.agility) {
        ++scaleModifier;
      } else {
        ++wingModifier;
      }

      ++excessPoints;
    }
  }

  return new models.Dragon(
    normalDragon.scaleThickness + scaleModifier,
    10,
    normalDragon.wingStrength + wingModifier,
    0
  );
}

function getDragon(aWeatherType, aKnight) {
  switch (aWeatherType) {
    case enums.WeatherType.NORMAL: {
      return calcDragon(aKnight);
      break;
    }
    case enums.WeatherType.RAIN: {
      return calcRainDragon(aKnight);
      break;
    }
    case enums.WeatherType.STORM:
      // dragon always dies, use default dragon
    case enums.WeatherType.FOG:
      // dragon always wins, use default dragon
    case enums.WeatherType.DROUGHT:
      // dragon needs to be balanced, use default dragon
    default: {
      return new models.Dragon(5, 5, 5, 5);
      break;
    }
  }
}

export {getDragon};
