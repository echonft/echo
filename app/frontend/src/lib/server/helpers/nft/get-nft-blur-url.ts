/**
 * Blur always resolves even if the asset does not exist, so there is no way to know if the link is good or not
 * @param contractAddress
 * @param tokenId
 */
export function getNftBlurUrl(contractAddress: string, tokenId: number) {
  return `https://blur.io/asset/${contractAddress}/${tokenId}`
}
