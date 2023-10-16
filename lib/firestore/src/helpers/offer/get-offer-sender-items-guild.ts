import { getItemGuild } from '@echo/firestore/helpers/item/get-item-guild'
import type { CollectionDiscordGuildData } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import type { Offer } from '@echo/model/types/offer'
import { head, pipe, prop } from 'ramda'

export function getOfferSenderItemsGuild(offer: Offer): Promise<CollectionDiscordGuildData> {
  // FIXME this is not gonna work with collections on Echo server
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return pipe(prop('receiverItems'), head, getItemGuild)(offer)
}
