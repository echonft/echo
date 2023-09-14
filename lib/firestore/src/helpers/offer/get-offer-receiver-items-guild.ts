import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import type { FirestoreOffer } from '@echo/firestore/types/model/firestore-offer'
import type { FirestoreOfferItem } from '@echo/firestore/types/model/firestore-offer-item'
import { pathIsNil } from '@echo/utils/fp/path-is-nil'
import { propIsNil } from '@echo/utils/fp/prop-is-nil'
import { forEach, head, isNil, path, pipe } from 'ramda'

export function getOfferReceiverItemsGuild(offer: Partial<FirestoreOffer>): FirestoreNftCollectionDiscordGuild {
  if (isNil(offer.receiverItems)) {
    throw Error('offer does not have receiver items')
  }
  const { receiverItems } = offer
  forEach((item: FirestoreOfferItem) => {
    if (
      propIsNil('nft', item) ||
      pathIsNil(['nft', 'collection'], item) ||
      pathIsNil(['nft', 'collection', 'discordGuild'], item)
    ) {
      throw Error('not every items have an nft with a collection with a discord guild')
    }
  }, receiverItems)
  return pipe(head, path(['nft', 'collection', 'discordGuild']))(receiverItems) as FirestoreNftCollectionDiscordGuild
}
