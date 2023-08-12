export enum UserProfilePictureSize {
  LARGE = 'Large',
  MEDIUM = 'Medium'
}

export const userProfilePictureSize = (size: UserProfilePictureSize) => {
  switch (size) {
    case UserProfilePictureSize.LARGE:
      return 160
    case UserProfilePictureSize.MEDIUM:
      return 120
  }
}

const userProfileTailwindSize = (size: UserProfilePictureSize) => {
  switch (size) {
    case UserProfilePictureSize.LARGE:
      return '-40'
    case UserProfilePictureSize.MEDIUM:
      return '-[120px]'
  }
}

export const userProfilePictureHeight = (size: UserProfilePictureSize) => `h${userProfileTailwindSize(size)}`

export const userProfilePictureWidth = (size: UserProfilePictureSize) => `w${userProfileTailwindSize(size)}`
