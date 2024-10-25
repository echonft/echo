import { CollectionGuildError } from '@echo/firestore/constants/errors/collection-guild-error'
import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { getCollectionDiscordGuildById } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guild-by-id'
import { deleteCollection } from '@echo/firestore/crud/collection/delete-collection'
import { CollectionError } from '@echo/model/constants/errors/collection-error'
import { addCollectionDiscordGuild as testAddCollectionDiscordGuild } from '@echo/test/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { deleteCollectionDiscordGuild } from '@echo/test/firestore/crud/collection-discord-guild/delete-collection-discord-guild'
import { collectionDocumentMockPxId } from '@echo/test/firestore/initialize-db'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - collection-discord-guild - addCollectionDiscordGuild', () => {
  const guildData = {
    collectionId: collectionDocumentMockPxId,
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

  it('throws if collection does not exist', async () => {
    await expect(
      addCollectionDiscordGuild({ collectionId: 'not-found', guild: { id: 'new', channelId: 'new' } })
    ).rejects.toEqual(Error(CollectionError.NotFound))
  })
  it('throws if collection guild already exists', async () => {
    addedGuildId = await testAddCollectionDiscordGuild(guildData)
    await expect(addCollectionDiscordGuild(guildData)).rejects.toEqual(Error(CollectionGuildError.Exists))
  })
  it('add a discord guild to an nft collection', async () => {
    // TODO
    // addedCollectionId = await addCollection(collectionData)
    const { id } = await addCollectionDiscordGuild(guildData)
    addedGuildId = id
    const newGuild = await getCollectionDiscordGuildById(id)
    expect(newGuild).toStrictEqual(guildData)
  })
})
