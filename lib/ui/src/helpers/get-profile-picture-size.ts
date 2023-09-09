import { SizeLG, SizeMD } from '../constants/size'
import { ProfilePictureSize } from '../types/profile-picture-size'

export const getProfilePictureSize = (size: ProfilePictureSize) => {
  switch (size) {
    case SizeLG:
      return 160
    case SizeMD:
      return 120
  }
}
