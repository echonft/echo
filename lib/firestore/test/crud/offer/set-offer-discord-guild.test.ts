import { findOfferById } from '@echo/firestore/crud/offer/find-offer-by-id'
import { setOfferDiscordGuild } from '@echo/firestore/crud/offer/set-offer-discord-guild'
import { updateOffer } from '@echo/firestore/crud/offer/update-offer'
import type { FirestoreNftCollectionDiscordGuild } from '@echo/firestore/types/model/firestore-nft-collection-discord-guild'
import type { FirestoreOfferDiscordGuild } from '@echo/firestore/types/model/firestore-offer-discord-guild'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertOffers } from '@test-utils/assert-offers'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'
import dayjs from 'dayjs'

describe('CRUD - offer - setOfferDiscordGuild', () => {
  let initialDiscordGuild: FirestoreOfferDiscordGuild | undefined
  let initialExpiresAt: dayjs.Dayjs
  const id = 'LyCfl6Eg7JKuD7XJ6IPi'
  const collectionGuild: FirestoreNftCollectionDiscordGuild = {
    channelId: '1',
    discordId: '1'
  }
  const threadId = 'thread-id'
  const offerGuild: FirestoreOfferDiscordGuild = {
    discordId: '1',
    threadId
  }

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertOffers()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const offer = await findOfferById(id)
    initialDiscordGuild = offer!.discordGuild
    initialExpiresAt = offer!.expiresAt
  })
  afterEach(async () => {
    await updateOffer(id, { discordGuild: initialDiscordGuild, expiresAt: initialExpiresAt })
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
