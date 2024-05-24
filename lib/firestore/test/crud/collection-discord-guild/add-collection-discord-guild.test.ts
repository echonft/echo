import { addCollectionDiscordGuild } from '@echo/firestore/crud/collection-discord-guild/add-collection-discord-guild'
import { assertCollectionDiscordGuilds } from '@echo/firestore-test/collection-discord-guild/assert-collection-discord-guilds'
import { deleteCollectionDiscordGuild } from '@echo/firestore-test/collection-discord-guild/delete-collection-discord-guild'
import { getCollectionDiscordGuildById } from '@echo/firestore-test/collection-discord-guild/get-collection-discord-guild-by-id'
import { COLLECTION_MOCK_PX_ID } from '@echo/model-mocks/collection/collection-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { isNil } from 'ramda'

describe('CRUD - collection-discord-guild - addCollectionDiscordGuild', () => {
  let collectionDiscordGuildId: Nullable<string>
  beforeAll(async () => {
    await assertCollectionDiscordGuilds()
  })
  afterAll(async () => {
    await assertCollectionDiscordGuilds()
  })
  beforeEach(() => {
    collectionDiscordGuildId = undefined
  })
  afterEach(async () => {
    if (!isNil(collectionDiscordGuildId)) {
      try {
        await deleteCollectionDiscordGuild(collectionDiscordGuildId)
      } catch (err) {
        throw Error(`error deleting collection discord guild ${collectionDiscordGuildId}: ${errorMessage(err)}`)
      }
    }
  })
  it('throws if trying to add a guild for a collection that does not exist', async () => {
    await expect(
      addCollectionDiscordGuild({ collectionId: 'not-found', guild: { id: 'new', channelId: 'new' } })
    ).rejects.toBeDefined()
  })
  it('throws if trying to add a guild that already exists to a collection', async () => {
    await expect(
      addCollectionDiscordGuild({ collectionId: COLLECTION_MOCK_PX_ID, guild: { id: '100', channelId: '100' } })
    ).rejects.toBeDefined()
  })
  it('add a discord guild to an nft collection', async () => {
    const newDocumentData = { collectionId: COLLECTION_MOCK_PX_ID, guild: { id: 'new', channelId: 'new' } }
    const { id, data } = await addCollectionDiscordGuild(newDocumentData)
    collectionDiscordGuildId = id
    expect(data).toStrictEqual(newDocumentData)
    const newGuild = (await getCollectionDiscordGuildById(id))!
    expect(newGuild).toStrictEqual(newDocumentData)
  })
})
