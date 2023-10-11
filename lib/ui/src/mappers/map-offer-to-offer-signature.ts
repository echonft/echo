/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Offer } from '@echo/ui/types/model/offer'
import { OfferItem } from '@echo/ui/types/model/offer-item'
import { OfferSignature } from '@echo/ui/types/model/offer-signature'
import { map, path, pipe } from 'ramda'
import { getAddress } from 'viem'

export function mapOfferToOfferSignature(offer: Offer): OfferSignature {
  return {
    id: offer.id,
    creator: getAddress(offer.sender.wallet.address),
    counterparty: getAddress(offer.receiver.wallet.address),
    expiresAt: offer.expiresAt.unix(),
    // @ts-ignore
    creatorCollections: map<OfferItem, string>(pipe(path(['nft', 'collection', 'contract', 'address']), getAddress))(
      offer.senderItems
    ),
    // @ts-ignore
    creatorIds: map<OfferItem, number>(path(['nft', 'tokenId']))(offer.senderItems),
    counterpartyCollections: map<OfferItem, string>(
      // @ts-ignore
      pipe(path(['nft', 'collection', 'contract', 'address']), getAddress)
    )(offer.receiverItems),
    // @ts-ignore
    counterpartyIds: map<OfferItem, number>(path(['nft', 'tokenId']))(offer.receiverItems)
  }
}
