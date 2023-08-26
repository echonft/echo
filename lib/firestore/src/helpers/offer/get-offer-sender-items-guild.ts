import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'
import { Offer } from '../../types/model/offer'
import { getNftCollectionGuild } from '../nft-collection/get-nft-collection-guild'
import { head, path, pipe, prop } from 'ramda'

export function getOfferSenderItemsGuild(offer: Offer): NftCollectionDiscordGuild {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('senderItems'), head, path(['nft', 'collection']), getNftCollectionGuild)(offer)
}
