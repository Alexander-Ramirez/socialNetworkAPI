const users = [
    'AlexRamirez',
    'TacoBell24',
    'GilderoyLockhart',
];

const thoughts = [
    "wooo I'm almost done",
    "Someone said tacos ?",
    "Pretty Obvious",
];

const getRandomValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUser = () =>
  `${getRandomValue(users)}`;

const getRandomThought = () =>
    `${getRandomValue(thoughts)}`;

module.exports = { getRandomUser, getRandomThought };