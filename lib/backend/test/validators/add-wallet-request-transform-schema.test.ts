import { addWalletRequestSchema } from '@echo/api/validators/add-wallet-request-schema'
import { getNonceForUser } from '@echo/firestore/crud/nonce/get-nonce-for-user'
import { getUserByUsername } from '@echo/firestore/crud/user/get-user-by-username'
import { userMockCrew } from '@echo/model/mocks/user-mock'
import { walletMockCrew } from '@echo/model/mocks/wallet-mock'
import { beforeEach, describe, expect, it, jest } from '@jest/globals'

jest.mock('@echo/firestore/crud/user/get-user-by-username')
jest.mock('@echo/firestore/crud/nonce/get-nonce-for-user')

describe('validators - addWalletRequestTransformSchema', () => {
  const username = 'username'
  const user = userMockCrew
  const wallet = walletMockCrew
  const signature =
    '0x89eb5dc2993d982fe4d261b06d8433dcdacb9fe22aac1623fe9d444668bb7d3509ee29b54a01278b325c71438849f9d052f2ead93e3614d8e19449a9376e74351c'
  const message = Buffer.from(
    'aHR0cHM6Ly90ZXN0LmVjaG9uZnQueHl6IHdhbnRzIHlvdSB0byBzaWduIGluIHdpdGggeW91ciBFdGhlcmV1bSBhY2NvdW50OgoweDFFMzkxOGRENDRGNDI3RjA1NmJlNkM4RTEzMmNGMWI1RjQyZGU1OUUKClNpZ24gdGhpcyBtZXNzYWdlIHRvIGFkZCB5b3VyIHdhbGxldCB0byBFY2hvCgpVUkk6IGh0dHBzOi8vdGVzdC5lY2hvbmZ0Lnh5egpWZXJzaW9uOiAxCkNoYWluIElEOiAxNjg1ODc3NzMKTm9uY2U6IG5vbmNlbm9uY2Vub25jZQpJc3N1ZWQgQXQ6IDIwMjQtMDctMDhUMjA6MTI6MzguNzA0Wg==',
    'base64'
  ).toString('ascii')
  const nonce = 'noncenoncenonce'

  beforeEach(() => {
    jest.clearAllMocks()

    jest.mocked(getUserByUsername).mockResolvedValue()
    jest.mocked(getNonceForUser).mockResolvedValue()
  })

  it('wrong message fails validation', async () => {
    // await expect(addWalletRequestTransformSchema(username).parseAsync({ wallet, signature, message: '' })).rejects
  })

  it('valid request pass', async () => {
    await expect(addWalletRequestSchema.parseAsync({ wallet, signature, message })).resolves.toEqual({
      wallet,
      nonce
    })
  })
})
