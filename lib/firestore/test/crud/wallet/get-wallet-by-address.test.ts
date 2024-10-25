import { getWallet } from '@echo/firestore/crud/wallet/get-wallet'
import { getWalletDocumentDataMockById } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-id'
import { walletMockJohnnyId } from '@echo/firestore/mocks/wallet/wallet-document-data-mock'
import { Chain } from '@echo/model/constants/chain'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('CRUD - wallet - getWalletByAddress', () => {
  it('returns undefined if the wallet is not found', async () => {
    const wallet = await getWallet({
      chain: Chain.Ethereum,
      address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    })
    expect(wallet).toBeUndefined()
  })
  it('returns undefined if the wallet if it exists', async () => {
    const walletMock = getWalletDocumentDataMockById(walletMockJohnnyId())
    const wallet = await getWallet({
      chain: walletMock.chain,
      address: toLower(walletMock.address)
    })
    expect(wallet).toStrictEqual(walletMock)
  })
})
