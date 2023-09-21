import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { getDiscordUserMockById } from '@echo/firestore-mocks/discord-user/get-discord-user-mock-by-id'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertNfts } from '@test-utils/nft/assert-nfts'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft - setNftOwner', () => {
  let initialOwner: Partial<FirestoreUserDetails>
  const id = '8hHFadIrrooORfTOLkBg'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNfts()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const user = await findNftById(id)
    initialOwner = user!.owner!
  })
  afterEach(async () => {
    await updateNft(id, { owner: initialOwner })
  })

  it('set the right owner data', async () => {
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    await setNftOwner(id, user.id, user.name, wallet)
    const nft = await findNftById(id)
    const discordUser = getDiscordUserMockById('WpgDZHmdpvHjykHRRWp7')
    const { owner } = nft!
    expect(owner.wallet?.address).toEqual(wallet.address)
    expect(owner.wallet?.chainId).toEqual(wallet.chainId)
    expect(owner.discordId).toEqual(discordUser.discordId)
    expect(owner.discordUsername).toEqual(discordUser.discordUsername)
  })
})
