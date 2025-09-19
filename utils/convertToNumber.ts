export function convertToNumber(data?: string): number | undefined {
  if (!data) return undefined;

  const number = Number(data);
  return isNaN(number) ? undefined : number;
}
