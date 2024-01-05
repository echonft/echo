import type { UserDocumentData } from '@echo/firestore/types/model/user/user-document-data'

export interface User extends UserDocumentData {
  id: string
  createdAt: number
  updatedAt: number
}
