import { mapWalletDocumentDataToWallet } from '@echo/firestore/mappers/wallet/map-wallet-document-data-to-wallet'
import { getWalletDocumentDataMockById } from '@echo/firestore/mocks/wallet/get-wallet-document-data-mock-by-id'
import { walletMockJohnnyId } from '@echo/firestore/mocks/wallet/wallet-document-data-mock'
import { userMockJohnnyUsername } from '@echo/model/mocks/user/user-mock'
import { getWalletMockByUsername } from '@echo/model/mocks/wallet/wallet-mock'
import { describe, expect, it } from '@jest/globals'

describe('mappers - mapWalletDocumentDataToWallet', () => {
  it('maps correctly', () => {
    const wallet = getWalletDocumentDataMockById(walletMockJohnnyId())
    expect(mapWalletDocumentDataToWallet(wallet)).toStrictEqual(getWalletMockByUsername(userMockJohnnyUsername()))
  })
})
