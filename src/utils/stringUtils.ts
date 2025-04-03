export function capitalizeWords(sentence: string): string {
  if (!sentence.trim()) return '';
  return sentence
    .split(' ')
    .map(word => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ''))
    .join(' ');
}
