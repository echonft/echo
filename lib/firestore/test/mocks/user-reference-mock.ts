import { UserDocumentData } from '../../src/types/model/document-data/user-document-data'
import { DocumentReference } from 'firebase-admin/firestore'

export const userReferenceMock: { [key: string]: DocumentReference<UserDocumentData> } = {
  '6rECUMhevHfxABZ1VNOm': {
    id: '6rECUMhevHfxABZ1VNOm',
    path: 'users/6rECUMhevHfxABZ1VNOm'
  } as unknown as DocumentReference<UserDocumentData>,
  '9tPlFOv1XkR3ng7KI46B': {
    id: '9tPlFOv1XkR3ng7KI46B',
    path: 'users/9tPlFOv1XkR3ng7KI46B'
  } as unknown as DocumentReference<UserDocumentData>,
  oE6yUEQBPn7PZ89yMjKn: {
    id: 'oE6yUEQBPn7PZ89yMjKn',
    path: 'users/oE6yUEQBPn7PZ89yMjKn'
  } as unknown as DocumentReference<UserDocumentData>,
  xUcl0enoVsuvpsAf9syg: {
    id: 'xUcl0enoVsuvpsAf9syg',
    path: 'users/xUcl0enoVsuvpsAf9syg'
  } as unknown as DocumentReference<UserDocumentData>
}
