import { CollectionName } from '@echo/firestore/constants/collection-name'
import { findNftCollectionById } from '@echo/firestore/crud/nft-collection/find-nft-collection-by-id'
import { getNftCollectionDiscordGuildsByNftCollectionId } from '@echo/firestore/crud/nft-collection-discord-guild/get-nft-collection-discord-guilds-by-nft-collection-id'
import { firestoreApp } from '@echo/firestore/services/firestore-app'
import type {
  FirestoreNftCollectionDiscordGuild,
  NftCollectionDiscordGuildData
} from '@echo/firestore/types/model/nft-collection/firestore-nft-collection-discord-guild'
import { includes, isNil, map, pipe, prop } from 'ramda'

export async function addNftCollectionDiscordGuild(
  collectionId: string,
  guildDiscordId: string,
  guildChannelId: string
): Promise<FirestoreNftCollectionDiscordGuild> {
  const guild: NftCollectionDiscordGuildData = {
    channelId: guildChannelId,
    discordId: guildDiscordId
  }
  const discordGuilds = await getNftCollectionDiscordGuildsByNftCollectionId(collectionId)
  if (pipe(map(prop<NftCollectionDiscordGuildData>('guild')), includes(guild))(discordGuilds)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection with id ${collectionId} while it already exists`
    )
  }
  const nftCollection = await findNftCollectionById(collectionId)
  if (isNil(nftCollection)) {
    throw Error(
      `trying to add discord guild with discordId ${guildDiscordId} and channelId ${guildChannelId} for nft collection with id ${collectionId} but this collection does not exist`
    )
  }
  const reference = firestoreApp().collection(CollectionName.NFT_COLLECTION_DISCORD_GUILDS).doc()
  const id = reference.id
  const newNftCollectionDiscordGuild: FirestoreNftCollectionDiscordGuild = { id, collectionId, guild }
  await reference.set(newNftCollectionDiscordGuild)
  return newNftCollectionDiscordGuild
}
