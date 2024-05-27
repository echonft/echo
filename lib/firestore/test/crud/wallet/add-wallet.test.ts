import { addWallet } from '@echo/firestore/crud/wallet/add-wallet'
import { deleteWallet } from '@echo/firestore/crud/wallet/delete-wallet'
import {
  getUserDocumentDataMockById,
  USER_MOCK_CREW_ID,
  USER_MOCK_JOHNNY_ID
} from '@echo/firestore-mocks/user/user-document-data-mock'
import { getWalletDocumentDataMockByUserId } from '@echo/firestore-mocks/wallet/get-wallet-document-data-mock-by-user-id'
import { assertWallets } from '@echo/firestore-test/wallet/assert-wallets'
import { getWalletById } from '@echo/firestore-test/wallet/get-wallet-by-id'
import { USER_MOCK_JOHNNY_USERNAME } from '@echo/model-mocks/user/user-mock'
import { CHAIN_BLAST, CHAIN_ETHEREUM } from '@echo/utils/constants/chain-names'
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
    const wallet = getWalletDocumentDataMockByUserId(USER_MOCK_CREW_ID)
    const user = getUserDocumentDataMockById(wallet.userId)
    const otherEvmChainWallet = pipe(pick(['address', 'chain']), assoc('chain', CHAIN_BLAST))(wallet)
    const { data } = await addWallet(user.username, otherEvmChainWallet)
    expect(data).toStrictEqual(assoc('chain', CHAIN_BLAST, wallet))
  })
  it('throws if trying to add an existing EVM wallet that is link to another user', async () => {
    const wallet = getWalletDocumentDataMockByUserId(USER_MOCK_CREW_ID)
    const otherEvmChainWallet = pipe(pick(['address', 'chain']), assoc('chain', CHAIN_BLAST))(wallet)
    await expect(addWallet(USER_MOCK_JOHNNY_USERNAME, otherEvmChainWallet)).rejects.toBeDefined()
  })
  it('throws if the wallet already exists and is not EVM', async () => {
    const address = '0xnewaddress'
    const chain = 'solona'
    const { id, data } = await addWallet(USER_MOCK_JOHNNY_USERNAME, {
      address,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      chain
    })
    addedWalletId = id
    expect(data).toStrictEqual({
      userId: USER_MOCK_JOHNNY_ID,
      address,
      chain,
      isEvm: false
    })
    await expect(
      addWallet(USER_MOCK_JOHNNY_USERNAME, {
        address,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        chain
      })
    ).rejects.toBeDefined()
  })
  it('throws if the user does not exists', async () => {
    await expect(
      addWallet('not-found', { address: toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8'), chain: CHAIN_ETHEREUM })
    ).rejects.toBeDefined()
  })
  it('add wallet', async () => {
    const address = toLower('0xF48cb479671B52E13D0ccA4B3178027D3d1D1ac8')
    const { id } = await addWallet(USER_MOCK_JOHNNY_USERNAME, {
      address,
      chain: CHAIN_ETHEREUM
    })
    addedWalletId = id
    const wallet = (await getWalletById(id))!
    expect(wallet.userId).toEqual('oE6yUEQBPn7PZ89yMjKn')
    expect(wallet.chain).toEqual(CHAIN_ETHEREUM)
    expect(wallet.address).toEqual(address)
  })
})
