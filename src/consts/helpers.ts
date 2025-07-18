// These values are made up. Do not make any conclusions from these values.
const difficultyLevel = {
  EASY: 4,
  MEDIUM: 5,
  HARD: 7,
};

export function calculateChangeRate(
  fob: any,
  missions: Array<any>,
  nTimeslots: number,
  aircraft: any,
  multiplier: number = 1,
) {
  if (fob === null || missions === null || nTimeslots === null || aircraft === null) return [];
  if (fob === undefined || missions === undefined || nTimeslots === undefined || aircraft === undefined) return [];
  // Calculating the change rate over time is now independent from any model
  // and is only intended for visual understanding of the application.

  // The change rate starts at the wearlevel of the aircraft at t = 0,
  const output = [aircraft.wear]

  // Calculate a seed that is consistent every time calculated, but different for every scenario
  const fobNameLength = fob.name?.length ?? 1;
  const tailNumber = parseInt(aircraft.tail.split('-')[1]);
  const seed = Math.pow(multiplier * fobNameLength * tailNumber * 7.1 - 9, 3);

  // Add to the output
  [...Array(nTimeslots).keys()].forEach((ts) => {
    const mission = missions.find((m) => m.timeslot === ts);
    if (!mission) {
      // If no mission is found, copy last entry of output (nothing happens)
      output.push(output[ts]);
    } else {
      const dif = mission.difficulty;
      output.push(seed % difficultyLevel[dif] + output[ts]);
    }
  });
  return output.map((v) => Math.round(v));
}