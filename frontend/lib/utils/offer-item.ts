import { Erc721 } from '@echo/model/erc721'
import { OfferItem } from '@echo/model/offer-item'
import { isEmpty } from 'ramda'

export function createOfferItems(contractAddresses: string[], nfts: Erc721[]): OfferItem[] {
  if (isEmpty(contractAddresses) && isEmpty(nfts)) {
    return []
  }
  if (isEmpty(nfts)) {
    return contractAddresses.map((contractAddress) => ({ contractAddress }))
  }
  // In case we have both, filter the contracts that have no ids and add as item with the nfts
  const contractsOnly = contractAddresses.filter(
    (contractAddress) => !nfts.some((nft) => nft.collection.address === contractAddress)
  )
  return contractsOnly
    .map((contractAddress) => ({ contractAddress }))
    .concat(nfts.map((nft) => ({ contractAddress: nft.collection.address, id: nft.id })))
}
