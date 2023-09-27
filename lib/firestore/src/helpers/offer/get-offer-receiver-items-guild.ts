import { getItemGuild } from '@echo/firestore/helpers/item/get-item-guild'
import type { NftCollectionDiscordGuildData } from '@echo/firestore/types/model/nft-collection-discord-guild/firestore-nft-collection-discord-guild'
import type { FirestoreOffer } from '@echo/firestore/types/model/offer/firestore-offer'
import { head, pipe, prop } from 'ramda'

export function getOfferReceiverItemsGuild(offer: Partial<FirestoreOffer>): Promise<NftCollectionDiscordGuildData> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('receiverItems'), head, getItemGuild)(offer)
}
