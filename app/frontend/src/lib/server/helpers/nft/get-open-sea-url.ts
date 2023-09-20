// TODO support more chains
export function getOpenSeaUrl(contractAddress: string, _chainId: number, tokenId: number) {
  return new URL(`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`)
}
