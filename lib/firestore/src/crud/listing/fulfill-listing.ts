import { updateListing } from './update-listing'
import { WriteResult } from 'firebase-admin/firestore'

export const fulfillListing = (id: string): Promise<WriteResult> => updateListing(id, { state: 'FULFILLED' })
