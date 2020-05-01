const KeyValuePair = require("./key-value-pair");

/**
 * 
 * @param {Array<KeyValuePair>} encounter 
 */
const randomizeEncounter = (encounter) => {
  // modify encounter rate in order
  encounter.forEach((e, index) => {
    if (index !== 0) {
      e.value += encounter[index - 1].value;
    }
  });
  
  // get random roll
  const roll = getRandomValue(1, 100);

  let enemyId;
  // loop roll value against rate
  for (let index = 0; index < encounter.length; index++) {
    if (roll <= encounter[index].value) {
      enemyId = encounter[index].key;
      break;
    }
  }

  return enemyId;
}

/**
 * 
 * @param {Number} min minimum random value
 * @param {Number} max maximum random value
 */
const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { randomizeEncounter, getRandomValue };