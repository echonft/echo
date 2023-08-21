import { DiscordGuild } from '../../types/model/discord-guild'
import { NftCollection } from '../../types/model/nft-collection'

export const getNftCollectionGuild = (collection: NftCollection): DiscordGuild => collection.discordGuild
