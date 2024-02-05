import type { Nullable } from '@echo/utils/types/nullable'

export interface AuthUser {
  username: string
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: Nullable<string>
    bannerColor?: Nullable<string>
    bannerUrl?: Nullable<string>
    id: string
    username: string
  }
}
