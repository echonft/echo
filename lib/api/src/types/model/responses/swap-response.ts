import { FirestoreSwapData } from '@echo/firestore'

export interface SwapResponse extends Omit<FirestoreSwapData, 'refPath'> {}
