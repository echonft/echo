import { UserProfilePictureSize } from '../constants/user-profile-picture-size'
import { getUserProfilePictureTailwindSize } from './get-user-profile-picture-tailwind-size'

export const getUserProfilePictureHeight = (size: UserProfilePictureSize) =>
  `h${getUserProfilePictureTailwindSize(size)}`
