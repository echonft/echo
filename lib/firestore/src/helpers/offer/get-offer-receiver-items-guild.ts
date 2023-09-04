import { NftCollectionDiscordGuild, Offer } from '@echo/firestore-types'
import { head, path, pipe, prop } from 'ramda'

export function getOfferReceiverItemsGuild(offer: Offer): NftCollectionDiscordGuild {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('receiverItems'), head, path(['nft', 'collection', 'discordGuild']))(offer)
}
