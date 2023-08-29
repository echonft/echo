import { UserProfilePictureSize } from '../constants/user-profile-picture-size'
import { SizeLG, SizeMD } from '@echo/ui-model'

export const getUserProfilePictureTailwindSize = (size: UserProfilePictureSize) => {
  switch (size) {
    case SizeLG:
      return '-40'
    case SizeMD:
      return '-[120px]'
  }
}
