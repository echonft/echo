import { type Wallet } from '@echo/model/types/wallet'
import type { WithId } from '@echo/model/types/with-id'

export interface WalletDocumentData extends Wallet, WithId {
  userId: string
}
