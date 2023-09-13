import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/firestore-user-details'
import { userMock } from '@echo/firestore-mocks/user-mock'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft - setNftOwner', () => {
  let initialOwner: Partial<FirestoreUserDetails>
  const id = '8hHFadIrrooORfTOLkBg'

  beforeAll(tearUpRemoteFirestoreTests)
  afterAll(tearDownRemoteFirestoreTests)
  beforeEach(async () => {
    const user = await findNftById(id)
    initialOwner = user!.owner!
  })
  afterEach(async () => {
    await updateNft(id, { owner: initialOwner })
  })

  it('setUserNonce', async () => {
    const user = userMock['6rECUMhevHfxABZ1VNOm']!
    const wallet = user.wallets[0]!
    await setNftOwner(id, user.id, wallet)
    const nft = await findNftById(id)
    const { owner } = nft!
    expect(owner.id).toEqual(user.id)
    expect(owner.wallet).toEqual(wallet)
    expect(owner.discordId).toEqual(user.discordId)
    expect(owner.discordAvatar).toEqual(user.discordAvatar)
    expect(owner.discordBanner).toEqual(user.discordBanner)
    expect(owner.discordUsername).toEqual(user.discordUsername)
  })
})
