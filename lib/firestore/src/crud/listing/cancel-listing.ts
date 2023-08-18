import { updateListing } from './update-listing'
import { WriteResult } from 'firebase-admin/firestore'

export const cancelListing = (id: string): Promise<WriteResult> => updateListing(id, { state: 'CANCELLED' })
