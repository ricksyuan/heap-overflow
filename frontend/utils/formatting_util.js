export function kFormatter(num, decimals) {
  return num > 999 ? (num / 1000).toFixed(decimals) + 'k' : num
}