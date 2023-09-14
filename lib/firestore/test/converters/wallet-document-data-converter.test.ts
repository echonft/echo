import { walletDocumentDataConverter } from '@echo/firestore/converters/wallet-document-data-converter'
import { getUserDocumentDataMockById } from '@echo/firestore-mocks/get-user-document-data-mock-by-id'
import { getUserMockById } from '@echo/firestore-mocks/get-user-mock-by-id'
import { describe, expect, it } from '@jest/globals'

describe('converters - userDataConverter', () => {
  const userDocumentData = getUserDocumentDataMockById('6rECUMhevHfxABZ1VNOm')!
  const user = getUserMockById('6rECUMhevHfxABZ1VNOm')
  const wallet = user.wallets[0]!
  const walletDocumentData = userDocumentData.wallets[0]!

  it('from Firestore conversion', () => {
    expect(walletDocumentDataConverter.fromFirestore(walletDocumentData)).toStrictEqual(wallet)
  })

  it('to Firestore conversion', () => {
    expect(walletDocumentDataConverter.toFirestore(wallet)).toStrictEqual(walletDocumentData)
  })
})
