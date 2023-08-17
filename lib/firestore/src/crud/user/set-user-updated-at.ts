import { updateUser } from './update-user'
import { Dayjs } from 'dayjs'
import { WriteResult } from 'firebase-admin/firestore'

export const setUserUpdatedAt = (userId: string, updatedAt: Dayjs): Promise<WriteResult> =>
  updateUser(userId, { updatedAt })
