// Any new classes, Add here
// not usually subject to change
// unless revamping
const baseStats = [
  {
    health: 150,
    mana: 100,
    classId: 1, // Saber
    off: 40,
    def: 30,
    agi: 40,
    int: 20,
    luk: 0.375
  },
  {
    health: 100,
    mana: 150,
    classId: 2, // Archer
    off: 30,
    def: 20,
    agi: 30,
    int: 30,
    luk: 0.625
  },
  {
    health: 100,
    mana: 100,
    classId: 3, // Lancer
    off: 30,
    def: 20,
    agi: 50,
    int: 20,
    luk: .50
  },
  {
    health: 300,
    mana: 100,
    classId: 4, // Berserker
    off: 50,
    def: 60,
    agi: 20,
    int: 20,
    luk: .125
  },
  {
    health: 100,
    mana: 300,
    classId: 5, // Caster
    off: 10,
    def: 20,
    agi: 40,
    int: 60,
    luk: .375
  },
];

// luk not included
const increment = [
  {
    health: 30,
    mana: 20,
    classId: 1, // Saber
    off: 8,
    def: 6,
    agi: 8,
    int: 4,
  },
  {
    health: 20,
    mana: 25,
    classId: 2, // Archer
    off: 6,
    def: 4,
    agi: 6,
    int: 5
  },
  {
    health: 20,
    mana: 20,
    classId: 3, // Lancer
    off: 6,
    def: 4,
    agi: 10,
    int: 4
  },
  {
    health: 60,
    mana: 20,
    classId: 4, // Berserker
    off: 10,
    def: 12,
    agi: 4,
    int: 4
  },
  {
    health: 20,
    mana: 60,
    classId: 5, // Caster
    off: 2,
    def: 4,
    agi: 8,
    int: 12
  },
]

module.exports = { baseStats, increment };