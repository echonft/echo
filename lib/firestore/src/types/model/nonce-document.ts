import type { Nonce } from '@echo/model/types/nonce'

export type NonceDocument = Omit<Nonce, 'expired'>
