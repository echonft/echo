import { DiscordGuild } from '../../types/model/discord-guild'
import { Listing } from '../../types/model/listing'
import { getNftCollectionGuild } from '../nft-collection/get-nft-collection-guild'

export const getListingGuild = (listing: Listing): DiscordGuild =>
  getNftCollectionGuild(listing.items[0].nft.collection)
