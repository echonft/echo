export interface UserDocumentData {
  id: string
  createdAt: number
  discord: {
    avatarUrl: string
    avatarDecorationUrl?: string
    bannerColor?: string
    bannerUrl?: string
    id: string
    username: string
  }
  updatedAt: number
  username: string
}
