import { SizeLG, SizeMD } from '../../types/size'

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

const getUserProfileTailwindSize = (size: UserProfilePictureSize) => {
  switch (size) {
    case SizeLG:
      return '-40'
    case SizeMD:
      return '-[120px]'
  }
}

export const getUserProfilePictureHeight = (size: UserProfilePictureSize) => `h${getUserProfileTailwindSize(size)}`

export const getUserProfilePictureWidth = (size: UserProfilePictureSize) => `w${getUserProfileTailwindSize(size)}`
