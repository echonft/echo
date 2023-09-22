import type { SessionDocumentData } from '@echo/firestore/types/model/session/session-document-data'
import { Timestamp } from 'firebase-admin/firestore'

export const sessionDocumentDataMock: { [key: string]: SessionDocumentData } = {
  KI5AJISonKCYslDm51Tn: {
    userId: '6rECUMhevHfxABZ1VNOm',
    sessionToken: 'token',
    expires: Timestamp.fromMillis(1694777183175)
  }
}
