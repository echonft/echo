/* eslint-disable @typescript-eslint/ban-ts-comment */
import { getItemTokenId } from '@echo/model/helpers/item/get-item-token-id'
import { getItemsContracts } from '@echo/model/helpers/item/get-items-contracts'
import type { Offer } from '@echo/model/types/offer'
import type { OfferSignature } from '@echo/ui/types/offer-signature'
import { applySpec, map, path, pipe, prop } from 'ramda'
import { getAddress } from 'viem'

// FIXME Remove ts-ignore, path can be nil and getAddress doesn't accept that.
// Maybe we should have an assert function before?
export function mapOfferToOfferSignature(offer: Offer): OfferSignature {
  return applySpec<OfferSignature>({
    id: prop('id'),
    // @ts-ignore
    creator: pipe(path(['sender', 'wallet', 'address']), getAddress),
    // @ts-ignore
    counterparty: pipe(path(['receiver', 'wallet', 'address']), getAddress),
    expiresAt: prop('expiresAt'),
    creatorCollections: pipe(prop('senderItems'), getItemsContracts, map(pipe(prop('address'), getAddress))),
    creatorIds: pipe(prop('senderItems'), map(getItemTokenId)),
    counterpartyCollections: pipe(prop('receiverItems'), getItemsContracts, map(pipe(prop('address'), getAddress))),
    counterpartyIds: pipe(prop('receiverItems'), map(getItemTokenId))
  })(offer)
}
