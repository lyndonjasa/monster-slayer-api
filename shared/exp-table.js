const expTable = [
  {
    "lvl": 1,
    "exp": 0
  },
  {
    "lvl": 2,
    "exp": 20
  },
  {
    "lvl": 3,
    "exp": 60
  },
  {
    "lvl": 4,
    "exp": 120
  },
  {
    "lvl": 5,
    "exp": 200
  },
  {
    "lvl": 6,
    "exp": 300
  },
  {
    "lvl": 7,
    "exp": 420
  },
  {
    "lvl": 8,
    "exp": 560
  },
  {
    "lvl": 9,
    "exp": 720
  },
  {
    "lvl": 10,
    "exp": 900
  },
  {
    "lvl": 11,
    "exp": 1100
  },
  {
    "lvl": 12,
    "exp": 1320
  },
  {
    "lvl": 13,
    "exp": 1560
  },
  {
    "lvl": 14,
    "exp": 1820
  },
  {
    "lvl": 15,
    "exp": 2100
  },
  {
    "lvl": 16,
    "exp": 2400
  },
  {
    "lvl": 17,
    "exp": 2720
  },
  {
    "lvl": 18,
    "exp": 3060
  },
  {
    "lvl": 19,
    "exp": 3420
  },
  {
    "lvl": 20,
    "exp": 3800
  },
  {
    "lvl": 21,
    "exp": 4200
  },
  {
    "lvl": 22,
    "exp": 4620
  },
  {
    "lvl": 23,
    "exp": 5060
  },
  {
    "lvl": 24,
    "exp": 5520
  },
  {
    "lvl": 25,
    "exp": 6000
  },
  {
    "lvl": 26,
    "exp": 6500
  },
  {
    "lvl": 27,
    "exp": 7020
  },
  {
    "lvl": 28,
    "exp": 7560
  },
  {
    "lvl": 29,
    "exp": 8120
  },
  {
    "lvl": 30,
    "exp": 8700
  },
  {
    "lvl": 31,
    "exp": 9300
  },
  {
    "lvl": 32,
    "exp": 9920
  },
  {
    "lvl": 33,
    "exp": 10560
  },
  {
    "lvl": 34,
    "exp": 11220
  },
  {
    "lvl": 35,
    "exp": 11900
  },
  {
    "lvl": 36,
    "exp": 12600
  },
  {
    "lvl": 37,
    "exp": 13320
  },
  {
    "lvl": 38,
    "exp": 14060
  },
  {
    "lvl": 39,
    "exp": 14820
  },
  {
    "lvl": 40,
    "exp": 15600
  },
  {
    "lvl": 41,
    "exp": 16400
  },
  {
    "lvl": 42,
    "exp": 17220
  },
  {
    "lvl": 43,
    "exp": 18060
  },
  {
    "lvl": 44,
    "exp": 18920
  },
  {
    "lvl": 45,
    "exp": 19800
  },
  {
    "lvl": 46,
    "exp": 20700
  },
  {
    "lvl": 47,
    "exp": 21620
  },
  {
    "lvl": 48,
    "exp": 22560
  },
  {
    "lvl": 49,
    "exp": 23520
  },
  {
    "lvl": 50,
    "exp": 24500
  }
]

const lvlFinder = (currentExp) => {
  let newLvl = 1, nxtLvlExp = 20;
  for (let index = 0; index < expTable.length; index++) {
    const element = expTable[index];
    if (element.lvl === 50) { // if max level
      newLvl = 50;
      nxtLvlExp = 0;
    } else {
      // if exp is in range
      if (element.exp <= currentExp && currentExp < expTable[index + 1].exp) {
        newLvl = element.lvl;
        nxtLvlExp = expTable[index + 1].exp;
        break;
      } else {
        continue;
      }
    }
  }

  return { newLvl, nxtLvlExp };
}

module.exports = { expTable, lvlFinder };