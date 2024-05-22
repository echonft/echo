import { getAllWalletDocumentDataMocks } from '@echo/firestore-mocks/wallet/get-all-wallet-document-data-mocks'
import { find, isNil, propEq } from 'ramda'

export function getWalletDocumentDataMockByUserId(userId: string) {
  const mock = find(propEq(userId, 'userId'), getAllWalletDocumentDataMocks())
  if (isNil(mock)) {
    throw Error(`wrong WalletDocumentData mock userId: ${userId}`)
  }
  return mock
}
