import { getItemGuilds } from '@echo/firestore/helpers/item/get-item-guilds'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { type Offer } from '@echo/model/types/offer'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, flatten, map, pipe, prop, uniq } from 'ramda'

export function getOfferSenderItemsGuilds(offer: Offer): Promise<CollectionDiscordGuild[]> {
  return pipe(prop('senderItems'), map(getItemGuilds), promiseAll, andThen(pipe(flatten, uniq)))(offer)
}
