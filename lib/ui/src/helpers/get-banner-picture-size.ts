import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { type BannerPictureSize } from '@echo/ui/types/banner-picture-size'

export const getBannerPictureSize = (size: BannerPictureSize) => {
  switch (size) {
    case SIZE_LG:
      return 256
    case SIZE_MD:
      return 160
  }
}
