import { NftCollectionDiscordGuild, Offer, OfferItem } from '@echo/firestore-types'
import pathIsNil from '@echo/utils/path-is-nil'
import propIsNil from '@echo/utils/prop-is-nil'
import { forEach, head, isNil, path, pipe } from 'ramda'

export function getOfferSenderItemsGuild(offer: Offer): NftCollectionDiscordGuild {
  if (isNil(offer.senderItems)) {
    throw Error('offer does not have sender items')
  }
  const { senderItems } = offer
  forEach((item: OfferItem) => {
    if (
      propIsNil('nft', item) ||
      pathIsNil(['nft', 'collection'], item) ||
      pathIsNil(['nft', 'collection', 'discordGuild'], item)
    ) {
      throw Error('not every items have an nft with a collection with a discord guild')
    }
  }, senderItems)
  return pipe(head, path(['nft', 'collection', 'discordGuild']))(senderItems) as NftCollectionDiscordGuild
}
