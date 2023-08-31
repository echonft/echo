import { UserProfilePictureSize } from '../constants/user-profile-picture-size'
import { SizeLG, SizeMD } from '@echo/ui-model'

export const getUserProfilePictureSize = (size: UserProfilePictureSize) => {
  switch (size) {
    case SizeLG:
      return 160
    case SizeMD:
      return 120
  }
}
