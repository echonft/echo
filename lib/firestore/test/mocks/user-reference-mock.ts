import { UserDocumentData } from '../../src/types/model/user-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const userReferenceMock: { [key: string]: DocumentReference<UserDocumentData> } = {
  '6rECUMhevHfxABZ1VNOm': {
    id: '6rECUMhevHfxABZ1VNOm',
    path: 'users/6rECUMhevHfxABZ1VNOm'
  } as unknown as DocumentReference<UserDocumentData>,
  oE6yUEQBPn7PZ89yMjKn: {
    id: 'oE6yUEQBPn7PZ89yMjKn',
    path: 'users/oE6yUEQBPn7PZ89yMjKn'
  } as unknown as DocumentReference<UserDocumentData>
}
