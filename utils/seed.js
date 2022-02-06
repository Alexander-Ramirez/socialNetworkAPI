const connection = require("../config/connection");
const { User, Thought } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("You are connected!");

  await User.deleteMany({});

  await Thought.deleteMany({});

  const seedThoughts = [
    {
      thoughtText:
        "wooo I'm almost done",
      username: "AlexRamirez",
    },
    {
      thoughtText: "Someone said tacos ?",
      username: "TacoBell24",
    },
    {
      thoughtText: "Pretty Obvious",
      username: "GilderoyLockhart",
    }
  ];

  const thoughts = Thought.insertMany(seedThoughts);
  console.log(thoughts);
  console.log(thoughts[0]);

  const seedUsers = [
    {
      username: "AlexRamirez",
      email: "AlexRamirez@gmail.com",
      thoughts: seedThoughts[0],
    },
    {
      username: "TacoBell24",
      email: "TacoBell24@gmail.com",
      thoughts: seedThoughts[1],
    },
    {
      username: "GilderoyLockhart",
      email: "GilderoyLockhart@gmail.com",
      thoughts: seedThoughts[2],
    }
  ];

  const users = await User.insertMany(seedUsers);
  console.log(users)

  console.table(seedUsers);
  console.table(seedThoughts);
  console.info("Seeding complete!");
  process.exit(0);
});