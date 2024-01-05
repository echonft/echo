import { type Session } from '@echo/firestore/types/model/session/session'
import { Timestamp } from 'firebase-admin/firestore'

export const sessionMock: Record<string, Session & Record<'id', string>> = {
  KI5AJISonKCYslDm51Tn: {
    id: 'KI5AJISonKCYslDm51Tn',
    userId: '6rECUMhevHfxABZ1VNOm',
    sessionToken: 'token',
    expires: Timestamp.fromMillis(1694777183175)
  }
}
