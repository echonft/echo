import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import { getAllWalletDocumentDataMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-document-data-mocks'
import { assertWallets } from '@echo/firestore-test/wallet/assert-wallets'
import { getWalletById } from '@echo/firestore-test/wallet/get-wallet-by-id'
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
  it('returns the wallet if it already exists', async () => {
    const wallet = head(getAllWalletDocumentDataMocks())
    const addedWallet = await addWallet('userId', pick(['address', 'chain'], wallet))
    expect(addedWallet).toStrictEqual(wallet)
  })
  it('add wallet', async () => {
    const address = toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    const { id } = await addWallet('6rECUMhevHfxABZ1VNOm', {
      address,
      chain: 'ethereum'
    })
    addedWalletId = id
    const wallet = (await getWalletById(id))!
    expect(wallet.userId).toEqual('6rECUMhevHfxABZ1VNOm')
    expect(wallet.chain).toEqual(1)
    expect(wallet.address).toEqual(address)
  })
})
