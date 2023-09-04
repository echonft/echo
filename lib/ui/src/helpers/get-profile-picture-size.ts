import { ProfilePictureSize } from '../constants/profile-picture-size'
import { SizeLG, SizeMD } from '@echo/ui-model'

export const getProfilePictureSize = (size: ProfilePictureSize) => {
  switch (size) {
    case SizeLG:
      return 160
    case SizeMD:
      return 120
  }
}
