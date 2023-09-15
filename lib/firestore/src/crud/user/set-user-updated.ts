import { updateUser } from '@echo/firestore/crud/user/update-user'
import dayjs from 'dayjs'
import type { WriteResult } from 'firebase-admin/lib/firestore'

export async function setUserUpdated(id: string): Promise<WriteResult> {
  return await updateUser(id, { updatedAt: dayjs() })
}
