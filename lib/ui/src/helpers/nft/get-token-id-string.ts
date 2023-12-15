export function getTokenIdString(tokenId: number, collectionSupply: number) {
  return `#${tokenId.toString().padStart(Math.ceil(Math.log10(collectionSupply)), '0')}`
}
