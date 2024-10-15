import type { Nonce } from '@echo/firestore/types/model/nonce'

export type NonceDocumentData = Omit<Nonce, 'expired'>
