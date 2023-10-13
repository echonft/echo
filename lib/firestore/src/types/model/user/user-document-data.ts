export interface UserDocumentData {
  id: string
  username: string
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: string
    bannerColor: string
    bannerUrl?: string
    id: string
    username: string
  }
  updatedAt: number
}
