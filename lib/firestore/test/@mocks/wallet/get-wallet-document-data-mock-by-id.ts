import { walletDocumentDataMock } from '@echo/firestore-mocks/wallet/wallet-document-data-mock'
import { isNil } from 'ramda'

export function getWalletDocumentDataMockById(id: string) {
  const mock = walletDocumentDataMock()[id]
  if (isNil(mock)) {
    throw Error(`wrong wallet mock id: ${id}`)
  }
  return mock
}
