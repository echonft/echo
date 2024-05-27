import { getWalletByAddress } from '@echo/firestore/crud/wallet/get-wallet-by-address'
import { getWalletDocumentDataMockById } from '@echo/firestore-mocks/wallet/get-wallet-document-data-mock-by-id'
import { CHAIN_ETHEREUM } from '@echo/utils/constants/chains/chains'
import { describe, expect, it } from '@jest/globals'
import { toLower } from 'ramda'

describe('CRUD - wallet - getWalletByAddress', () => {
  it('returns undefined if the wallet is not found', async () => {
    const wallet = await getWalletByAddress({
      chain: CHAIN_ETHEREUM,
      address: toLower('0x320e2fa93A4010ba47edcdE762802374bac8d3F7')
    })
    expect(wallet).toBeUndefined()
  })
  it('returns undefined if the wallet if it exists', async () => {
    const walletMock = getWalletDocumentDataMockById('i28NWtlxElPXCnO0c6BC')
    const wallet = await getWalletByAddress({
      chain: walletMock.chain,
      address: toLower(walletMock.address)
    })
    expect(wallet).toStrictEqual(walletMock)
  })
})
