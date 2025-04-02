export function capitalizeWords(sentence: string): string {
  if (!sentence.trim()) return ''; // Handle empty or whitespace-only strings
  return sentence
  .split(' ')
  .map(word => (word ? word.charAt(0).toUpperCase() + word.slice(1) : '')) // Handle extra spaces
  .join(' ');
}
