export function calcTimeToString(remainingTime: number) {
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return `${minutes} min ${seconds < 10 ? `0${seconds}` : seconds} sec`;
}
