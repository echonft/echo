import { OfferItem } from '@echo/ui/types/model/offer-item'

export function getContractOwnerOfForOfferItem(offerItem: OfferItem): string {
  switch (offerItem.nft.tokenType) {
    case 'ERC721':
      return 'ownerOf'
    case 'ERC1155':
    default:
      throw new Error('Unsupported Token Type')
  }
}
