import { updateOffer } from './update-offer'
import dayjs from 'dayjs'
import { WriteResult } from 'firebase-admin/firestore'

export const postOffer = (id: string, threadId: string): Promise<WriteResult> =>
  updateOffer(id, { postedAt: dayjs(), threadId })
