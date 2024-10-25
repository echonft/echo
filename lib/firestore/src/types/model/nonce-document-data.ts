import type { Nonce } from '@echo/model/types/nonce'

export type NonceDocumentData = Omit<Nonce, 'expired'>
