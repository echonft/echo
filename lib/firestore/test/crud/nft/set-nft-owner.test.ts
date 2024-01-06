import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { getNftSnapshotById } from '@echo/firestore/crud/nft/get-nft-snapshot-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { createUserFromFirestoreData } from '@echo/firestore/helpers/user/create-user-from-firestore-data'
import { getUserMockById } from '@echo/firestore-mocks/user/get-user-mock-by-username'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { assertNfts } from '@echo/firestore-test/nft/assert-nfts'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { type User } from '@echo/model/types/user'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'

describe('CRUD - nft - setNftOwner', () => {
  let initialOwner: User
  let initialUpdatedAt: number
  const nftId = '8hHFadIrrooORfTOLkBg'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNfts()
    await tearDownRemoteFirestoreTests()
  })

  beforeEach(async () => {
    const nft = (await findNftById(nftId))!
    initialOwner = nft.owner
    initialUpdatedAt = nft.updatedAt
  })
  afterEach(async () => {
    const snapshot = (await getNftSnapshotById(nftId))!
    await snapshot.ref.update({ owner: initialOwner, updatedAt: initialUpdatedAt })
  })

  it('set the right owner data', async () => {
    const user = getUserMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    const userDetails = createUserFromFirestoreData(user, wallet)
    await setNftOwner(nftId, userDetails)
    const nft = (await findNftById(nftId))!
    const { owner } = nft
    expect(owner.wallet.address).toEqual(wallet.address)
    expect(owner.wallet.chainId).toEqual(wallet.chainId)
    expect(owner.discord.username).toEqual(user.discord.username)
    expect(owner.discord.avatarUrl).toEqual(user.discord.avatarUrl)
    expectDateNumberIsNow(nft.updatedAt)
  })
})
