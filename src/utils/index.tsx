export function getRandomXY(length: number): { x: number; y: number }[] {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push({
      x: Math.random() * -10,
      y: Math.random() * -10,
    });
  }
  return arr;
}
