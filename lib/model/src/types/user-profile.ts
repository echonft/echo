import { type Wallet } from '@echo/model/types/wallet'
import type { Nullable } from '@echo/utils/types/nullable'

export interface UserProfile {
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: Nullable<string>
    bannerColor?: Nullable<string>
    bannerUrl?: Nullable<string>
    username: string
  }
  username: string
  wallets: Wallet[]
}
