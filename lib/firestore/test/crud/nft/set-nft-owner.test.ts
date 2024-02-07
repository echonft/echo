import { findNftById } from '@echo/firestore/crud/nft/find-nft-by-id'
import { setNftOwner } from '@echo/firestore/crud/nft/set-nft-owner'
import { getUserFromFirestoreData } from '@echo/firestore/helpers/user/get-user-from-firestore-data'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/user/get-user-document-data-mock-by-id'
import { getWalletMockById } from '@echo/firestore-mocks/wallet/get-wallet-mock-by-id'
import { assertNfts } from '@echo/firestore-test/nft/assert-nfts'
import { unchecked_updateNft } from '@echo/firestore-test/nft/unchecked_update-nft'
import { tearDownRemoteFirestoreTests } from '@echo/firestore-test/tear-down-remote-firestore-tests'
import { tearUpRemoteFirestoreTests } from '@echo/firestore-test/tear-up-remote-firestore-tests'
import { getNftMockById } from '@echo/model-mocks/nft/get-nft-mock-by-id'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { logger } from '@echo/utils/services/logger'
import { expectDateNumberIsNow } from '@echo/utils-test/expect-date-number-is-now'
import { afterAll, afterEach, beforeAll, describe, expect, it } from '@jest/globals'
import { omit } from 'ramda'

describe('CRUD - nft - setNftOwner', () => {
  const nftId = '8hHFadIrrooORfTOLkBg'

  beforeAll(async () => {
    await tearUpRemoteFirestoreTests()
  })
  afterAll(async () => {
    await assertNfts()
    await tearDownRemoteFirestoreTests()
  })
  afterEach(async () => {
    try {
      await unchecked_updateNft(nftId, omit(['id'], getNftMockById(nftId)))
    } catch (e) {
      logger.error(`Error reverting nft with id ${nftId}: ${errorMessage(e)}`)
    }
  })

  it('set the right owner data', async () => {
    const user = getUserDocumentDataMockById('oE6yUEQBPn7PZ89yMjKn')
    const wallet = getWalletMockById('i28NWtlxElPXCnO0c6BC')
    const userDetails = getUserFromFirestoreData(user, wallet)
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
