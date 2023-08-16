import { NftCollectionDocumentData } from '../../src/types/model/document-data/nft-collection-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const nftCollectionReferenceMock: { [key: string]: DocumentReference<NftCollectionDocumentData> } = {
  Rc8pLQXxgyQGIRL0fr13: {
    id: 'Rc8pLQXxgyQGIRL0fr13',
    path: 'nft-collections/Rc8pLQXxgyQGIRL0fr13'
  } as unknown as DocumentReference<NftCollectionDocumentData>,
  '1aomCtnoesD7WVll6Yi1': {
    id: '1aomCtnoesD7WVll6Yi1',
    path: 'nft-collections/1aomCtnoesD7WVll6Yi1'
  } as unknown as DocumentReference<NftCollectionDocumentData>
}
