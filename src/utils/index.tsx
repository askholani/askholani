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

interface GetResponsiveValueProps {
  values: (number | string)[];
  width: number;
  breakpoints: number[];
}

export function getResponsiveValue({
  values: [large, medium, small],
  width,
  breakpoints: [largeBp, mediumBp],
}: GetResponsiveValueProps): number | string {
  return width > largeBp ? large : width > mediumBp ? medium : small;
}
