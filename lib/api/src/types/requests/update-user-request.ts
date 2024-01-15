export interface UpdateUserRequest {
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: string
    bannerColor?: string
    bannerUrl?: string
    id: string
    username: string
  }
}
