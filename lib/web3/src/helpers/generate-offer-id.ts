import type { BaseOffer } from '@echo/model/types/base-offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { HexString } from '@echo/utils/types/hex-string'
import { parseOfferAbiParameters } from '@echo/web3/helpers/abi/parse-offer-abi-parameters'
import { hashOfferItems } from '@echo/web3/helpers/hash-offer-items'
import { applySpec, head, path, pipe, prop } from 'ramda'
import { encodeAbiParameters, keccak256 } from 'viem'

interface OfferAbiParameters {
  sender: HexString
  receiver: HexString
  senderItemsChainId: bigint
  senderItems: HexString
  receiverItemsChainId: bigint
  receiverItems: HexString
  expiration: bigint
}
/**
 * Recreate the offer ID generation from the contract to properly create the offer in the database
 * An offer ID is generated from keccak and encoding of its parameters.
 * See _generateOfferId on contract for details
 * @param offer The offer to generate the id from
 */
export function generateOfferId(offer: BaseOffer): HexString {
  return keccak256(
    encodeAbiParameters(parseOfferAbiParameters(), [
      applySpec<OfferAbiParameters>({
        sender: nonNullableReturn(path(['sender', 'wallet', 'address'])),
        receiver: nonNullableReturn(path(['receiver', 'wallet', 'address'])),
        senderItemsChainId: pipe(
          prop('senderItems'),
          nonNullableReturn(head),
          nonNullableReturn(path(['nft', 'collection', 'contract', 'chainId']))
        ),
        senderItems: pipe(prop('senderItems'), hashOfferItems),
        receiverItemsChainId: pipe(
          prop('receiverItems'),
          nonNullableReturn(head),
          nonNullableReturn(path(['nft', 'collection', 'contract', 'chainId']))
        ),
        receiverItems: pipe(prop('receiverItems'), hashOfferItems),
        expiration: prop('expiresAt')
      })(offer)
    ])
  )
}
