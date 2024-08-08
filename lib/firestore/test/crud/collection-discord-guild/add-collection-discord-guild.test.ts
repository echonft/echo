import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { deleteCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/delete-collection-discord-guild'
import { getCollectionDiscordGuildById } from '@echo/firestore/crud/collection-discord-guild/get-collection-discord-guild-by-id'
import { collectionMockPxId } from '@echo/model/mocks/collection/collection-mock'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterEach, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - collection-discord-guild - addCollectionDiscordGuild', () => {
  let collectionDiscordGuildId: Nullable<string>
  beforeEach(() => {
    collectionDiscordGuildId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionDiscordGuildId)) {
      await deleteCollectionDiscordGuild(collectionDiscordGuildId)
    }
  })
  it('throws if trying to add a guild for a collection that does not exist', async () => {
    await expect(
      addCollectionDiscordGuild({ collectionId: 'not-found', guild: { id: 'new', channelId: 'new' } })
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a guild that already exists to a collection', async () => {
    await expect(
      addCollectionDiscordGuild({ collectionId: collectionMockPxId(), guild: { id: '100', channelId: '100' } })
    ).rejects.toBeDefined()
  })
  it('add a discord guild to an nft collection', async () => {
    const newDocumentData = { collectionId: collectionMockPxId(), guild: { id: 'new', channelId: 'new' } }
    const { id, data } = await addCollectionDiscordGuild(newDocumentData)
    collectionDiscordGuildId = id
    expect(data).toStrictEqual(newDocumentData)
    const newGuild = (await getCollectionDiscordGuildById(id))!
    expect(newGuild).toStrictEqual(newDocumentData)
  })
})
