import { updateUser } from './update-user'
import dayjs from 'dayjs'
import { WriteResult } from 'firebase-admin/firestore'

export const setUserNftsUpdated = (id: string): Promise<WriteResult> => updateUser(id, { nftsUpdatedAt: dayjs() })
