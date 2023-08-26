import { walletDocumentDataConverter } from '../../src/converters/wallet-document-data-converter'
import { getUserMockById } from '../mocks/get-user-mock-by-id'
import { userDocumentDataMock } from '../mocks/user-document-data-mock'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  it('from Firestore conversion', () => {
    const userDocumentData = userDocumentDataMock['6rECUMhevHfxABZ1VNOm']!
    const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
    const wallet = user.wallets[0]!
    const walletDocumentData = userDocumentData.wallets[0]!
    expect(walletDocumentDataConverter.fromFirestore(wallet)).toStrictEqual(walletDocumentData)
  })

  it('to Firestore conversion', () => {
    const userDocumentData = userDocumentDataMock['6rECUMhevHfxABZ1VNOm']!
    const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
    const wallet = user.wallets[0]!
    const walletDocumentData = userDocumentData.wallets[0]!
    expect(walletDocumentDataConverter.toFirestore(walletDocumentData)).toStrictEqual(wallet)
  })
})
