import { NftCollectionDiscordGuild, Offer, OfferItem } from '@echo/firestore-types'
import pathIsNil from '@echo/utils/path-is-nil'
import propIsNil from '@echo/utils/prop-is-nil'
import { forEach, head, isNil, path, pipe } from 'ramda'

export function getOfferReceiverItemsGuild(offer: Partial<Offer>): NftCollectionDiscordGuild {
  if (isNil(offer.receiverItems)) {
    throw Error('offer does not have receiver items')
  }
  const { receiverItems } = offer
  forEach((item: OfferItem) => {
    if (
      propIsNil('nft', item) ||
      pathIsNil(['nft', 'collection'], item) ||
      pathIsNil(['nft', 'collection', 'discordGuild'], item)
    ) {
      throw Error('not every items have an nft with a collection with a discord guild')
    }
  }, receiverItems)
  return pipe(head, path(['nft', 'collection', 'discordGuild']))(receiverItems) as NftCollectionDiscordGuild
}
