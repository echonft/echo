import { getCollectionGuild } from './get-collection-guild'
import { DiscordGuild, ListingTarget } from '@echo/firestore'

export const getListingTargetGuild = (target: ListingTarget): DiscordGuild => getCollectionGuild(target.collection)
