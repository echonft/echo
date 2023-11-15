import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type ProfilePictureSize } from '@echo/ui/types/profile-picture-size'

export const getProfilePictureSize = (size: ProfilePictureSize) => {
  switch (size) {
    case SIZE_LG:
      return 160
    case SIZE_MD:
      return 120
  }
}
