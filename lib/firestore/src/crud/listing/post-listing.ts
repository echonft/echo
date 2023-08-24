import { updateListing } from './update-listing'
import dayjs from 'dayjs'
import { WriteResult } from 'firebase-admin/firestore'

export const postListing = (id: string): Promise<WriteResult> => updateListing(id, { postedAt: dayjs() })
