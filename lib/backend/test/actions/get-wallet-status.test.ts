import { getWalletStatus } from '@echo/backend/actions/get-wallet-status'
import { AuthError } from '@echo/backend/errors/messages/auth-error'
import { getAuthUser } from '@echo/backend/helpers/get-auth-user'
import { addNonce } from '@echo/firestore/crud/nonce/add-nonce'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { getUserSnapshotByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { getUserByWallet } from '@echo/firestore/crud/user/get-user-by-wallet'
import { userDocumentMockCrew, userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { initializeFirebase } from '@echo/firestore/services/initialize-firebase'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletStatus } from '@echo/model/constants/wallet-status'
import { userMockCrew, userMockJohnny } from '@echo/model/mocks/user-mock'
import { beforeEach, describe, expect, jest, test } from '@jest/globals'
import { assoc, dissoc } from 'ramda'

jest.mock('@echo/backend/helpers/get-auth-user')
jest.mock('@echo/firestore/services/initialize-firebase')
jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/user/get-user-by-wallet')
jest.mock('@echo/firestore/crud/nonce/get-nonce')
jest.mock('@echo/firestore/crud/nonce/add-nonce')

describe('getWalletStatus', () => {
  const address = '0x1e3918dd44f427f056be6c8e132cf1b5f42de59e'
  const nonce = 'nonce'
  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getAuthUser).mockResolvedValue(userMockJohnny.username)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.mocked(initializeFirebase).mockImplementation(() => {})
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getUserSnapshotByUsername).mockResolvedValue({
      data: () => userDocumentMockJohnny
    })
    jest.mocked(getUserByWallet).mockResolvedValue(undefined)
    jest.mocked(getNonce).mockResolvedValue({ userId: 'userId', nonce })
    jest.mocked(addNonce).mockResolvedValue({ id: 'nonce-id', data: { userId: 'userId', nonce } })
  })

  test('throws if the user is not authenticated', async () => {
    jest.mocked(getAuthUser).mockResolvedValue(undefined)
    await expect(getWalletStatus(address)).rejects.toEqual(Error(AuthError.Unauthorized))
  })

  test('throws if the user is not in the database', async () => {
    jest.mocked(getUserSnapshotByUsername).mockResolvedValue(undefined)
    await expect(getWalletStatus(address)).rejects.toEqual(Error(UserError.NotFound))
  })

  test('status "Linked"', async () => {
    await expect(getWalletStatus(address)).resolves.toStrictEqual({ status: WalletStatus.Linked })
  })

  test('status "Unavailable"', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getUserSnapshotByUsername).mockResolvedValue({
      data: () => assoc('wallet', userMockCrew.wallet, userDocumentMockJohnny)
    })
    await expect(getWalletStatus(address)).resolves.toStrictEqual({ status: WalletStatus.Unavailable })
  })

  test('status "LinkedToOtherUser"', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getUserSnapshotByUsername).mockResolvedValue({
      data: () => dissoc('wallet', userDocumentMockJohnny)
    })
    jest.mocked(getUserByWallet).mockResolvedValue(userDocumentMockCrew)
    await expect(getWalletStatus(address)).resolves.toStrictEqual({ status: WalletStatus.LinkedToOtherUser })
  })

  test('status "NeedsSignature" with existing nonce', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getUserSnapshotByUsername).mockResolvedValue({
      data: () => dissoc('wallet', userDocumentMockJohnny)
    })
    await expect(getWalletStatus(address)).resolves.toStrictEqual({ status: WalletStatus.NeedsSignature, nonce })
    expect(addNonce).not.toHaveBeenCalled()
  })

  test('status "NeedsSignature" without an existing nonce', async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.mocked(getUserSnapshotByUsername).mockResolvedValue({
      data: () => dissoc('wallet', userDocumentMockJohnny)
    })
    jest.mocked(getNonce).mockResolvedValue(undefined)
    await expect(getWalletStatus(address)).resolves.toStrictEqual({ status: WalletStatus.NeedsSignature, nonce })
    expect(addNonce).toHaveBeenCalledTimes(1)
  })
})
