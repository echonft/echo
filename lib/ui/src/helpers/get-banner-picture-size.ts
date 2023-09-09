import { SizeLG, SizeMD } from '../constants/size'
import { BannerPictureSize } from '../types/banner-picture-size'

export const getBannerPictureSize = (size: BannerPictureSize) => {
  switch (size) {
    case SizeLG:
      return 256
    case SizeMD:
      return 160
  }
}
