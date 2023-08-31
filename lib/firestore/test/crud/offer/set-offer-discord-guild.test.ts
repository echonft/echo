import { findOfferById } from '../../../src/crud/offer/find-offer-by-id'
import { setOfferDiscordGuild } from '../../../src/crud/offer/set-offer-discord-guild'
import { updateOffer } from '../../../src/crud/offer/update-offer'
import { NftCollectionDiscordGuild } from '../../../src/types/model/nft-collection-discord-guild'
import { OfferDiscordGuild } from '../../../src/types/model/offer-discord-guild'
import { tearDownRemoteFirestoreTests } from '../../test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '../../test-utils/tear-up-remote-firestore-tests'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import dayjs, { Dayjs } from 'dayjs'

describe('CRUD - offer - setOfferDiscordGuild', () => {
  let initialDiscordGuild: OfferDiscordGuild | undefined
  let initialExpiresAt: Dayjs
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  const collectionGuild: NftCollectionDiscordGuild = {
    channelId: '1',
    discordId: '1'
  }
  const threadId = 'thread-id'
  const offerGuild: OfferDiscordGuild = {
    discordId: '1',
    threadId
  }

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialDiscordGuild = offer!.discordGuild
    initialExpiresAt = offer!.expiresAt
  })
  afterEach(async () => {
    await updateOffer(id, { discordGuild: initialDiscordGuild, expiresAt: initialExpiresAt })
  })

  it('throws if the offer is expired', async () => {
    await updateOffer(id, { discordGuild: undefined, expiresAt: dayjs().subtract(1, 'day') })
    await expect(setOfferDiscordGuild(id, collectionGuild, threadId)).rejects.toBeDefined()
  })

  it('throws if the offer already has a discord guild', async () => {
    await updateOffer(id, { discordGuild: offerGuild, expiresAt: dayjs().add(1, 'day') })
    await expect(setOfferDiscordGuild(id, collectionGuild, threadId)).rejects.toBeDefined()
  })

  it('set the offer discord guild', async () => {
    await setOfferDiscordGuild(id, collectionGuild, threadId)
    const updatedOffer = await findOfferById(id)
    expect(updatedOffer!.discordGuild).toEqual(offerGuild)
  })
})
