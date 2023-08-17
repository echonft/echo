import { updateUser } from './update-user'
import dayjs, { Dayjs } from 'dayjs'
import { WriteResult } from 'firebase-admin/firestore'

/**
 *
 * @param userId
 * @param updatedAt if updatedAt is undefined, we use now. This field is useful for testing only
 */
export const setUserUpdatedAt = (userId: string, updatedAt?: Dayjs): Promise<WriteResult> =>
  updateUser(userId, { updatedAt: updatedAt ?? dayjs() })
