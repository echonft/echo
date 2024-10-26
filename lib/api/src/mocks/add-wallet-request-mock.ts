import type { AddWalletRequest } from '@echo/api/types/requests/add-wallet-request'
import type { NonceDocument } from '@echo/firestore/types/model/nonce-document'
import { Chain } from '@echo/model/constants/chain'
import { walletMockJohnny } from '@echo/model/mocks/wallet-mock'
import { futureDate } from '@echo/utils/helpers/future-date'

export const addWalletRequestMock: AddWalletRequest = {
  address: walletMockJohnny.address,
  chain: Chain.Blast,
  signature:
    '0x89eb5dc2993d982fe4d261b06d8433dcdacb9fe22aac1623fe9d444668bb7d3509ee29b54a01278b325c71438849f9d052f2ead93e3614d8e19449a9376e74351c',
  message: Buffer.from(
    'aHR0cHM6Ly90ZXN0LmVjaG9uZnQueHl6IHdhbnRzIHlvdSB0byBzaWduIGluIHdpdGggeW91ciBFdGhlcmV1bSBhY2NvdW50OgoweDFFMzkxOGRENDRGNDI3RjA1NmJlNkM4RTEzMmNGMWI1RjQyZGU1OUUKClNpZ24gdGhpcyBtZXNzYWdlIHRvIGFkZCB5b3VyIHdhbGxldCB0byBFY2hvCgpVUkk6IGh0dHBzOi8vdGVzdC5lY2hvbmZ0Lnh5egpWZXJzaW9uOiAxCkNoYWluIElEOiAxNjg1ODc3NzMKTm9uY2U6IG5vbmNlbm9uY2Vub25jZQpJc3N1ZWQgQXQ6IDIwMjQtMDctMDhUMjA6MTI6MzguNzA0Wg==',
    'base64'
  ).toString('ascii')
}

export const addWalletRequestNonceMock: NonceDocument = {
  nonce: 'noncenoncenonce',
  expiresAt: futureDate(),
  userId: 'userId'
}
