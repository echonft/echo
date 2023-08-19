import { DiscordGuild, NftCollection } from '@echo/firestore'

export const getCollectionGuild = (collection: NftCollection): DiscordGuild => collection.discordGuild
