import { BannerPictureSize } from '../constants/banner-picture-size'
import { SizeLG, SizeMD } from '@echo/ui-model'

export const getBannerPictureSize = (size: BannerPictureSize) => {
  switch (size) {
    case SizeLG:
      return 256
    case SizeMD:
      return 160
  }
}
