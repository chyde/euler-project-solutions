// 109

const generateAllShots = () => {
  let shots = [
    { name: "Bull", value: 25 },
    { name: "Double Bull", value: 50 }
  ];

  for (let index = 1; index <= 20; index++) {
    shots.push({ name: index.toString(), value: index });
    shots.push({ name: `Double ${index}`, value: index * 2 });
    shots.push({ name: `Triple ${index}`, value: index * 3 });
  }

  shots.sort((a, b) => a.value - b.value);

  return shots;
};
const shots = generateAllShots();

const findAllCheckouts = score => {
  let checkouts = [];
  let rounds = [];

  // Shoot every possible
  for (let shotIndex = 0; shotIndex < shots.length; shotIndex++) {
    const availableShot = shots[shotIndex];

    if (availableShot.value <= score) {
      let shot = {
        score: score - availableShot.value,
        shots: [availableShot.name]
      };
      if (shot.score === 0) {
        checkouts.push(shot);
      } else {
        rounds.push(shot);
      }
    }
  }

  for (let roundsIndex = 0; roundsIndex < rounds.length; roundsIndex++) {
    const element = rounds[roundsIndex];
    // TODO call new func to cycle through all the shots
  }

  return checkouts;
};

console.log(findAllCheckouts(15));
