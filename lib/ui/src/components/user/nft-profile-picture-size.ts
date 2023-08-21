import { SizeLG, SizeMD } from '@echo/ui-model'

export const userProfilePictureSizes = [SizeMD, SizeLG] as const
export type UserProfilePictureSize = (typeof userProfilePictureSizes)[number]

export const getUserProfilePictureSize = (size: UserProfilePictureSize) => {
  switch (size) {
    case SizeLG:
      return 160
    case SizeMD:
      return 120
  }
}
