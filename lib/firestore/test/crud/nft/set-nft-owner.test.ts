import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { updateNft } from '@echo/firestore/crud/nft/update-nft'
import type { FirestoreUserDetails } from '@echo/firestore/types/model/user/firestore-user-details'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-id'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assertNfts } from '@test-utils/nft/assert-nfts'
import { tearDownRemoteFirestoreTests } from '@test-utils/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@test-utils/tear-up-remote-firestore-tests'

describe('CRUD - nft - setNftOwner', () => {
  let initialOwner: FirestoreUserDetails
  const nftId = '8hHFadIrrooORfTOLkBg'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNfts()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const user = await findNftById(nftId)
    initialOwner = user!.owner!
  })
  afterEach(async () => {
    await updateNft(nftId, { owner: initialOwner })
  })

  it('set the right owner data', async () => {
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    await setNftOwner(nftId, user, wallet)
    const nft = (await findNftById(nftId))!
    const { owner } = nft
    expect(owner.wallet.address).toEqual(wallet.address)
    expect(owner.wallet.chainId).toEqual(wallet.chainId)
    expect(owner.discord.username).toEqual(user.discord.username)
    expect(owner.discord.avatarUrl).toEqual(user.discord.avatarUrl)
  })
})
