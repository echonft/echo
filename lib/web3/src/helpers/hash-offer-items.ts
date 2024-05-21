import type { OfferItem } from '@echo/model/types/offer-item'
import type { HexString } from '@echo/utils/types/hex-string'
import { parseOfferItemsAbiParameters } from '@echo/web3/helpers/abi/parse-offer-items-abi-parameters'
import { mapOfferItemToAbiParams } from '@echo/web3/mappers/map-offer-item-to-abi-params'
import { map } from 'ramda'
import { encodeAbiParameters, keccak256 } from 'viem'

export function hashOfferItems(offerItems: OfferItem[]): HexString {
  return keccak256(encodeAbiParameters(parseOfferItemsAbiParameters(), [map(mapOfferItemToAbiParams)(offerItems)]))
}
