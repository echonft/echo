import { ItemRequest } from '../types'
import { mapContractToTargetRequest } from './map-contract-to-target-request'
import { OfferItem } from '@echo/model'

export function mapOfferItemToItemRequest(offerItem: OfferItem): ItemRequest {
  return { tokenId: offerItem.tokenId.toString(), target: mapContractToTargetRequest(offerItem.contract) }
}
