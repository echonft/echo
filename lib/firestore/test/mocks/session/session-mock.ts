import type { FirestoreSession } from '@echo/firestore/types/model/session/firestore-session'
import dayjs from 'dayjs'

export const sessionMock: { [key: string]: FirestoreSession } = {
  KI5AJISonKCYslDm51Tn: {
    userId: '6rECUMhevHfxABZ1VNOm',
    sessionToken: 'token',
    expires: dayjs(1694777183175)
  }
}
