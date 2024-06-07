import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import {
  getUserDocumentDataMockById,
  userMockCrewId,
  userMockJohnnyId
} from '@echo/firestore/mocks/user/user-document-data-mock'
import { getWalletDocumentDataMockByUserId } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-user-id'
import { assertWallets } from '@echo/firestore/utils/wallet/assert-wallets'
import { getWalletById } from '@echo/firestore/crud/wallet/get-wallet-by-id'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { errorMessage } from '@echo/utils/helpers/error-message'
import { pinoLogger } from '@echo/utils/services/pino-logger'
import type { Nullable } from '@echo/utils/types/nullable'
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from '@jest/globals'
import { assoc, isNil, pick, pipe, toLower } from 'ramda'

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
  it('return the wallet with the new chain if an EVM wallet already exists with the same address and user', async () => {
    const wallet = getWalletDocumentDataMockByUserId(userMockCrewId())
    const user = getUserDocumentDataMockById(wallet.userId)
    const otherEvmChainWallet = pipe(pick(['address', 'chain']), assoc('chain', 'blast'))(wallet)
    const { data } = await addWallet(user.username, otherEvmChainWallet)
    expect(data).toStrictEqual(assoc('chain', 'blast', wallet))
  })
  it('throws if trying to add an existing EVM wallet that is link to another user', async () => {
    const wallet = getWalletDocumentDataMockByUserId(userMockCrewId())
    const otherEvmChainWallet = pipe(pick(['address', 'chain']), assoc('chain', 'blast'))(wallet)
    await expect(addWallet(userMockJohnnyUsername(), otherEvmChainWallet)).rejects.toBeDefined()
  })
  it('throws if the wallet already exists and is not EVM', async () => {
    const address = '0xnewaddress'
    const chain = 'solona'
    const { id, data } = await addWallet(userMockJohnnyUsername(), {
      address,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      chain
    })
    addedWalletId = id
    expect(data).toStrictEqual({
      userId: userMockJohnnyId(),
      address,
      chain,
      isEvm: false
    })
    await expect(
      addWallet(userMockJohnnyUsername(), {
        address,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        chain
      })
    ).rejects.toBeDefined()
  })
  it('throws if the user does not exists', async () => {
    await expect(
      addWallet('not-found', { address: toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8'), chain: 'ethereum' })
    ).rejects.toBeDefined()
  })
  it('add wallet', async () => {
    const address = toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    const { id } = await addWallet(userMockJohnnyUsername(), {
      address,
      chain: 'ethereum'
    })
    addedWalletId = id
    const wallet = (await getWalletById(id))!
    expect(wallet.userId).toEqual(userMockJohnnyId())
    expect(wallet.chain).toEqual('ethereum')
    expect(wallet.address).toEqual(address)
  })
})
