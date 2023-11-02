import { getItemTokenId } from '@echo/model/helpers/item/get-item-token-id'
import { getItemsContracts } from '@echo/model/helpers/item/get-items-contracts'
import type { Offer } from '@echo/model/types/offer'
import { nonNullableReturn } from '@echo/utils/fp/non-nullable-return'
import type { OfferSignature } from '@echo/web3/types/offer-signature'
import { applySpec, map, path, pipe, prop } from 'ramda'
import { getAddress } from 'viem'

export function mapOfferToOfferSignature(offer: Offer): OfferSignature {
  return applySpec<OfferSignature>({
    id: prop('id'),
    creator: pipe(nonNullableReturn(path(['sender', 'wallet', 'address'])), getAddress),
    counterparty: pipe(nonNullableReturn(path(['receiver', 'wallet', 'address'])), getAddress),
    expiresAt: prop('expiresAt'),
    creatorCollections: pipe(prop('senderItems'), getItemsContracts, map(pipe(prop('address'), getAddress))),
    creatorIds: pipe(prop('senderItems'), map(getItemTokenId)),
    counterpartyCollections: pipe(prop('receiverItems'), getItemsContracts, map(pipe(prop('address'), getAddress))),
    counterpartyIds: pipe(prop('receiverItems'), map(getItemTokenId))
  })(offer)
}
