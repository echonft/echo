export function getDiscordImageFormat(hash: string): 'gif' | 'png' {
  if (hash.startsWith('a_')) {
    return 'gif'
  }
  return 'png'
}
