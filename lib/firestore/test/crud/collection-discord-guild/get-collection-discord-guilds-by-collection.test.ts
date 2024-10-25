import { getCollectionDiscordGuildsByCollection } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guilds-by-collection'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { addCollectionDiscordGuild } from '@echo/test/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { deleteCollectionDiscordGuild } from '@echo/test/firestore/crud/collection-discord-guild/delete-collection-discord-guild'
import { collectionDocumentMockPxId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - collection-discord-guild - getCollectionDiscordGuildsByCollection', () => {
  const collectionId = collectionDocumentMockPxId
  const guildData = {
    collectionId,
    guild: {
      id: '100',
      channelId: '100'
    }
  }
  // const collectionData = collectionMockPx()
  let addedCollectionId: Nullable<string>
  let addedGuildId: Nullable<string>

  beforeEach(() => {
    addedCollectionId = undefined
    addedGuildId = undefined
  })
  afterEach(async () => {
    if (!isNil(addedCollectionId)) {
      await deleteCollection(addedCollectionId)
    }
    if (!isNil(addedGuildId)) {
      await deleteCollectionDiscordGuild(addedGuildId)
    }
  })

  it('returns an empty array if there is no document for the given collection', async () => {
    await expect(getCollectionDiscordGuildsByCollection('not-found')).resolves.toEqual([])
  })

  it('returns the discord guilds associated with the collection', async () => {
    // TODO
    // addedCollectionId = await addCollection(collectionData)
    addedGuildId = await addCollectionDiscordGuild(guildData)
    const documents = await getCollectionDiscordGuildsByCollection(collectionId)
    expect(documents.length).toBe(1)
    expect(documents[0]).toStrictEqual(guildData)
  })
})
