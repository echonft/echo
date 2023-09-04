import { NftCollectionDiscordGuild, Offer } from '@echo/firestore-types'
import { head, path, pipe, prop } from 'ramda'

export function getOfferSenderItemsGuild(offer: Offer): NftCollectionDiscordGuild {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('senderItems'), head, path(['nft', 'collection', 'discordGuild']))(offer)
}
