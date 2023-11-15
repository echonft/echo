import { SIZE_LG, SIZE_MD, SIZE_SM } from '@echo/ui/constants/size'
import { type IconSize } from '@echo/ui/types/icon-size'

export const getIconSizeInPx = (size: IconSize) => {
  switch (size) {
    case SIZE_SM:
      return 24
    case SIZE_MD:
      return 30
    case SIZE_LG:
      return 40
    default:
      throw Error(`Wrong icon size`)
  }
}
