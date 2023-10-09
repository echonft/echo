import { OfferItem } from '@echo/ui/types/model/offer-item'

export function getContractApprovalForOfferItem(offerItem: OfferItem): string {
  switch (offerItem.nft.tokenType) {
    case 'ERC721':
      return 'isApprovedForAll'
    case 'ERC1155':
    default:
      throw new Error('Unsupported Token Type')
  }
}
