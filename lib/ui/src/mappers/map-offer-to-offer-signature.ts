import { getItemTokenId } from '@echo/model/helpers/item/get-item-token-id'
import { getItemsContracts } from '@echo/model/helpers/item/get-items-contracts'
import type { Offer } from '@echo/model/types/offer'
import type { OfferSignature } from '@echo/ui/types/offer-signature'
import { applySpec, map, path, pipe, prop } from 'ramda'

function numberToBigInt(num: number): bigint {
  return BigInt(num)
}

export function mapOfferToOfferSignature(offer: Offer): OfferSignature {
  return applySpec<OfferSignature>({
    id: prop('id'),
    creator: path(['sender', 'wallet', 'address']),
    counterparty: path(['receiver', 'wallet', 'address']),
    expiresAt: pipe(prop('expiresAt'), numberToBigInt),
    creatorCollections: pipe(prop('senderItems'), getItemsContracts, map(prop('address'))),
    creatorIds: pipe(prop('senderItems'), map(pipe(getItemTokenId, numberToBigInt))),
    counterpartyCollections: pipe(prop('receiverItems'), getItemsContracts, map(prop('address'))),
    counterpartyIds: pipe(prop('receiverItems'), map(pipe(getItemTokenId, numberToBigInt)))
  })(offer)
}
