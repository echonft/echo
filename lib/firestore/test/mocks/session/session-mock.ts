import type { Session } from '@echo/firestore/types/model/session/session'
import dayjs from 'dayjs'

export const sessionMock: Record<string, Session> = {
  KI5AJISonKCYslDm51Tn: {
    userId: '6rECUMhevHfxABZ1VNOm',
    sessionToken: 'token',
    expires: dayjs(1694777183175)
  }
}
