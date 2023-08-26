import { NftCollection } from '../../types/model/nft-collection'
import { NftCollectionDiscordGuild } from '../../types/model/nft-collection-discord-guild'

export const getNftCollectionGuild = (collection: NftCollection): NftCollectionDiscordGuild => collection.discordGuild
