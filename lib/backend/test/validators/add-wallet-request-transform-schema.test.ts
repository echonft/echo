import { addWalletRequestMock, addWalletRequestNonceMock } from '@echo/api/mocks/add-wallet-request-mock'
import { ForbiddenError } from '@echo/backend/errors/forbidden-error'
import { addWalletRequestTransformSchema } from '@echo/backend/validators/add-wallet-request-transform-schema'
import { getNonce } from '@echo/firestore/crud/nonce/get-nonce'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { userDocumentMockJohnny } from '@echo/firestore/mocks/user-document-mock'
import { UserError } from '@echo/model/constants/errors/user-error'
import { WalletError } from '@echo/model/constants/errors/wallet-error'
import { VirtualMachine } from '@echo/model/constants/virtual-machine'
import { walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { pastDate } from '@echo/utils/helpers/past-date'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'
import { assoc } from 'ramda'
import { ZodError, ZodIssueCode } from 'zod'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/nonce/get-nonce')

describe('validators - addWalletRequestTransformSchema', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.mocked(getUserByUsername).mockResolvedValue(userDocumentMockJohnny)
    jest.mocked(getNonce).mockResolvedValue(addWalletRequestNonceMock)
  })

  it('fails if the signature is invalid', async () => {
    await expect(
      addWalletRequestTransformSchema(userDocumentMockJohnny.username).parseAsync(
        assoc(
          'signature',
          '0x89eb5dc2993d982fe4d261b06d8433dcdacb9fe22aac1623fe9d444668bb7d3509ee29b54a01278b325c71438849f9d052f2ead93e3614d8e19449a9376e74351b',
          addWalletRequestMock
        )
      )
    ).rejects.toEqual(
      ZodError.create([
        {
          code: ZodIssueCode.custom,
          message: WalletError.SignatureInvalid,
          path: []
        }
      ])
    )
  })

  it('fails if the user is not found', async () => {
    jest.mocked(getUserByUsername).mockResolvedValue(undefined)
    await expect(
      addWalletRequestTransformSchema(userDocumentMockJohnny.username).parseAsync(addWalletRequestMock)
    ).rejects.toEqual(
      ZodError.create([
        {
          code: ZodIssueCode.custom,
          message: UserError.NotFound,
          path: []
        }
      ])
    )
  })

  it('fails if the nonce is not found', async () => {
    jest.mocked(getNonce).mockResolvedValue(undefined)
    await expect(
      addWalletRequestTransformSchema(userDocumentMockJohnny.username).parseAsync(addWalletRequestMock)
    ).rejects.toEqual(new ForbiddenError({ message: WalletError.NonceNotFound }))
  })

  it('fails if the nonce is invalid', async () => {
    jest.mocked(getNonce).mockResolvedValue(assoc('nonce', 'invalid', addWalletRequestNonceMock))
    await expect(
      addWalletRequestTransformSchema(userDocumentMockJohnny.username).parseAsync(addWalletRequestMock)
    ).rejects.toEqual(new ForbiddenError({ message: WalletError.NonceInvalid }))
  })

  it('fails if the nonce is expired', async () => {
    jest.mocked(getNonce).mockResolvedValue(assoc('expiresAt', pastDate(), addWalletRequestNonceMock))
    await expect(
      addWalletRequestTransformSchema(userDocumentMockJohnny.username).parseAsync(addWalletRequestMock)
    ).rejects.toEqual(new ForbiddenError({ message: WalletError.NonceExpired }))
  })

  it('valid request maps correctly', async () => {
    await expect(
      addWalletRequestTransformSchema(userDocumentMockJohnny.username).parseAsync(addWalletRequestMock)
    ).resolves.toEqual({ address: walletMockJohnny.address, vm: VirtualMachine.Evm })
  })
})
