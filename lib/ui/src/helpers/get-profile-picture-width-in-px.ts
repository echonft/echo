import { SIZE_LG, SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import type { ProfilePictureSize } from '@echo/ui/types/profile-picture-size'

export function getProfilePictureWidthInPx(size: ProfilePictureSize): number {
  switch (size) {
    case SIZE_LG:
      return 160
    case SIZE_MD:
      return 112
    case SIZE_SM:
      return 94
  }
}
