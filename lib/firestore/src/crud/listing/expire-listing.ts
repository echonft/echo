import { updateListing } from './update-listing'
import { WriteResult } from 'firebase-admin/firestore'

export const expireListing = (id: string): Promise<WriteResult> => updateListing(id, { state: 'EXPIRED' })
