import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { type BannerPictureSize } from '@echo/ui/types/banner-picture-size'

export const getBannerPictureSize = (size: BannerPictureSize) => {
  switch (size) {
    case SizeLG:
      return 256
    case SizeMD:
      return 160
  }
}
