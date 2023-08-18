import { findNftById } from '../../../src/crud/nft/find-nft-by-id'
import { setNftOwner } from '../../../src/crud/nft/set-nft-owner'
import { updateNft } from '../../../src/crud/nft/update-nft'
import { initialize } from '../../../src/services/initialize'
import { terminate } from '../../../src/services/terminate'
import { UserDetails } from '../../../src/types/model/user-details'
import { userMock } from '../../mocks/user-mock'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - setNftOwner', () => {
  let initialOwner: UserDetails
  const id = '8hHFadIrrooORfTOLkBg'

  beforeAll(initialize)
  afterAll(terminate)
  beforeEach(async () => {
    const user = await findNftById(id)
    initialOwner = user.owner!
  })
  afterEach(async () => {
    await updateNft(id, { owner: initialOwner })
  })

  it('setUserNonce', async () => {
    const user = userMock['6rECUMhevHfxABZ1VNOm']!
    const wallet = user.wallets[0]!
    await setNftOwner(id, user.id, wallet)
    const { owner } = await findNftById(id)
    expect(owner.id).toEqual(user.id)
    expect(owner.wallet).toEqual(wallet)
    expect(owner.discordId).toEqual(user.discordId)
    expect(owner.discordAvatar).toEqual(user.discordAvatar)
    expect(owner.discordBanner).toEqual(user.discordBanner)
    expect(owner.discordUsername).toEqual(user.discordUsername)
  })
})
