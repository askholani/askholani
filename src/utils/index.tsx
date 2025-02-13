export function getRandomXY(length: number): { x: number; y: number }[] {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push({
      x: Math.random() * -40,
      y: Math.random() * -40,
    });
  }
  return arr;
}
