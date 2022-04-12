export function getRandomPastelColor(): string {
  const hue = Math.floor(Math.random() * 360);
  return 'hsl(' + hue + ', 100%, 80%)';
}
