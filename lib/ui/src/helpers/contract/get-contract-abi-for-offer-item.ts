import { OfferItem } from '@echo/ui/types/model/offer-item'
import { Abi } from 'viem'
import { erc721ABI } from 'wagmi'

export function getContractAbiForOfferItem(offerItem: OfferItem): Abi {
  switch (offerItem.nft.tokenType) {
    case 'ERC721':
      return erc721ABI
    case 'ERC1155':
    default:
      throw new Error('Unsupported Token Type')
  }
}
