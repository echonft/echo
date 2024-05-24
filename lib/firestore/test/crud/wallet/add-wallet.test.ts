import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getAllWalletDocumentDataMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-document-data-mocks'
import { assertWallets } from '@echo/firestore-test/wallet/assert-wallets'
import { getWalletById } from '@echo/firestore-test/wallet/get-wallet-by-id'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { head, isNil, pick, toLower } from 'ramda'

describe('CRUD - wallet - addWallet', () => {
  let addedWalletId: Nullable<string>

  beforeAll(async () => {
    await assertWallets()
  })
  afterAll(async () => {
    await assertWallets()
  })
  beforeEach(() => {
    addedWalletId = undefined
  })
  afterEach(async () => {
    if (!isNil(addedWalletId)) {
      try {
        await deleteWallet(addedWalletId)
      } catch (e) {
        pinoLogger.error(`Error deleting wallet with id ${addedWalletId}: ${errorMessage(e)}`)
      }
    }
  })
  it('throws if the wallet already exists', async () => {
    const wallet = head(getAllWalletDocumentDataMocks())
    await expect(addWallet('whatever', pick(['address', 'chain'], wallet))).rejects.toBeDefined()
  })
  it('throws if the user does not exists', async () => {
    await expect(
      addWallet('not-found', { address: toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8'), chain: 'ethereum' })
    ).rejects.toBeDefined()
  })
  it('add wallet', async () => {
    const address = toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    const { id } = await addWallet(USER_MOCK_JOHNNY_USERNAME, {
      address,
      chain: 'ethereum'
    })
    addedWalletId = id
    const wallet = (await getWalletById(id))!
    expect(wallet.userId).toEqual('oE6yUEQBPn7PZ89yMjKn')
    expect(wallet.chain).toEqual('ethereum')
    expect(wallet.address).toEqual(address)
  })
})
