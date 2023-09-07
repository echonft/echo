import { updateUser } from './update-user'
import dayjs from 'dayjs'
import { WriteResult } from 'firebase-admin/firestore'

export async function setUserNftsUpdated(id: string): Promise<WriteResult> {
  return await updateUser(id, { nftsUpdatedAt: dayjs() })
}
