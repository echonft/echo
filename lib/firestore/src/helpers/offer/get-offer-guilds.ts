import { getItemGuilds } from '@echo/firestore/helpers/item/get-item-guilds'
import type { CollectionDiscordGuild } from '@echo/firestore/types/model/collection-discord-guild/collection-discord-guild'
import { type Offer } from '@echo/model/types/offer'
import type { OfferItem } from '@echo/model/types/offer-item'
import { promiseAll } from '@echo/utils/fp/promise-all'
import { andThen, concat, converge, flatten, map, pipe, prop, uniq } from 'ramda'

export function getOfferGuilds(offer: Offer): Promise<CollectionDiscordGuild[]> {
  return pipe<
    [Offer],
    OfferItem[],
    Promise<CollectionDiscordGuild[]>[],
    Promise<CollectionDiscordGuild[][]>,
    Promise<CollectionDiscordGuild[]>
  >(
    converge(concat, [prop('receiverItems'), prop('senderItems')]),
    map(getItemGuilds),
    promiseAll,
    andThen(pipe(flatten, uniq))
  )(offer)
}
