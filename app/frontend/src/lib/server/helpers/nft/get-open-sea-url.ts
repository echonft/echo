// TODO support more chains
export const getOpenSeaUrl = (contractAddress: string, _chainId: number, tokenId: number) =>
  new URL(`https://opensea.io/assets/ethereum/${contractAddress}/${tokenId}`)
