import { FirestoreSnapshot } from '../../src/types/abstract/firestore-snapshot'
import { UserDocumentData } from '../../src/types/model/document-data/user-document-data'
import { userDocumentDataMock } from './user-document-data-mock'
import { userReferenceMock } from './user-reference-mock'

export const userSnapshotMock: { [key: string]: FirestoreSnapshot<UserDocumentData> } = {
  '6rECUMhevHfxABZ1VNOm': {
    ref: userReferenceMock['6rECUMhevHfxABZ1VNOm']!,
    id: userReferenceMock['6rECUMhevHfxABZ1VNOm']!.id,
    exists: true,
    data: () => userDocumentDataMock['6rECUMhevHfxABZ1VNOm']
  } as unknown as FirestoreSnapshot<UserDocumentData>,
  '9tPlFOv1XkR3ng7KI46B': {
    ref: userReferenceMock['9tPlFOv1XkR3ng7KI46B']!,
    id: userReferenceMock['9tPlFOv1XkR3ng7KI46B']!.id,
    exists: true,
    data: () => userDocumentDataMock['9tPlFOv1XkR3ng7KI46B']
  } as unknown as FirestoreSnapshot<UserDocumentData>,
  oE6yUEQBPn7PZ89yMjKn: {
    ref: userReferenceMock['oE6yUEQBPn7PZ89yMjKn']!,
    id: userReferenceMock['oE6yUEQBPn7PZ89yMjKn']!.id,
    exists: true,
    data: () => userDocumentDataMock['oE6yUEQBPn7PZ89yMjKn']
  } as unknown as FirestoreSnapshot<UserDocumentData>,
  xUcl0enoVsuvpsAf9syg: {
    ref: userReferenceMock['xUcl0enoVsuvpsAf9syg']!,
    id: userReferenceMock['xUcl0enoVsuvpsAf9syg']!.id,
    exists: true,
    data: () => userDocumentDataMock['xUcl0enoVsuvpsAf9syg']
  } as unknown as FirestoreSnapshot<UserDocumentData>
}
