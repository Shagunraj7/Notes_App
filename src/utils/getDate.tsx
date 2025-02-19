export default function getDate(str: string): string {
  const currentDate = str ? new Date(str) : new Date();
  return currentDate.toLocaleDateString();
}
