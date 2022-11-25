import { Erc721 } from '@echo/model/erc721'
import { OfferItem } from '@echo/model/offer-item'
import { isEmpty } from 'rambda'

export function generateOfferItems(contractAddresses: string[], nfts: Erc721[]): OfferItem[] | undefined {
  if (isEmpty(contractAddresses) && isEmpty(nfts)) {
    return undefined
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
