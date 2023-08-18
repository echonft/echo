import { updateListing } from './update-listing'
import { WriteResult } from 'firebase-admin/firestore'

export const invalidateListing = (id: string): Promise<WriteResult> => updateListing(id, { state: 'INVALID' })
