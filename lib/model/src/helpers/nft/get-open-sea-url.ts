// TODO support more chains
export function getOpenSeaUrl(contractAddress: string, tokenId: number) {
  return `https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`
}
