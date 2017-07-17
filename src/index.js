'use strict';

const repositories = require('./repositories');
const models = require('./models');
const enums = require('./enums');
const dragonTrainingCenter = require('./dragon-training-center');
const mugloarNews = require('./mugloar-news');

let totalNumberOfBattles = 0;
let battlesWon = 0;

async function doBattle() {
  const battle = await repositories.battles.start();
  const weather = await repositories.weather.get(battle.gameId);

  const attack = new models.Attack(
    dragonTrainingCenter.getDragon(weather.report.code, battle.knight)
  );

  const outcome = await repositories.attacks.attack(battle.gameId, attack);

  if (outcome.status === enums.OutcomeType.VICTORY) {
    ++battlesWon;
  }

  console.log(mugloarNews.stringifyBattle(weather, battle, attack, outcome));
}

function batchOfBattles() {
  const battles = [];

  // start a batch of 10 battles
  for (let i = 0; i < 10; ++i) {
    battles.push(
      doBattle()
        .catch(console.error)
    );
  }

  // show updated statistics after each batch
  return Promise.all(battles)
    .then(() => {
      totalNumberOfBattles += 10;
      console.log('Number of battles won: ' + battlesWon);
      console.log('Total number of battles: ' + totalNumberOfBattles);
      console.log('Win ratio: ' + (battlesWon / totalNumberOfBattles * 100).toFixed(2) + '%');
      console.log('\n############################################\n');

      if (totalNumberOfBattles < 1000) {
        setTimeout(batchOfBattles, 2500);
      }
    });
}

batchOfBattles();
