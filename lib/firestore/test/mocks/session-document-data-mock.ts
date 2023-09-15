import type { SessionDocumentData } from '@echo/firestore/types/model/session-document-data'
import { Timestamp } from 'firebase-admin/firestore'

export const sessionDocumentDataMock: { [key: string]: SessionDocumentData } = {
  '6rECUMhevHfxABZ1VNOm': {
    userId: '6rECUMhevHfxABZ1VNOm',
    sessionToken: 'token',
    expires: Timestamp.fromMillis(1694777183175)
  }
}
