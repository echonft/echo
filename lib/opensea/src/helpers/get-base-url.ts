export function getBaseUrl(tesnet: boolean) {
  if (tesnet) {
    return 'https://testnets-api.opensea.io/api/v2'
  }
  return 'https://api.opensea.io/api/v2'
}
