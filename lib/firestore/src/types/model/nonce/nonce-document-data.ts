import type { Nonce } from '@echo/firestore/types/model/nonce/nonce'

export type NonceDocumentData = Omit<Nonce, 'expired'>
