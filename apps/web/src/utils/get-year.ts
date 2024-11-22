export function getYear(date: typeof Date) {
  return new Date(date.now()).getFullYear().toString(10);
}
