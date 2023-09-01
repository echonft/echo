import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'
import { Offer } from '../../types/model/offer'
import { head, path, pipe, prop } from 'ramda'

export function getOfferReceiverItemsGuild(offer: Offer): NftCollectionDiscordGuild {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('receiverItems'), head, path(['nft', 'collection', 'discordGuild']))(offer)
}
