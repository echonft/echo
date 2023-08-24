import { SizeLG, SizeMD, SizeSM } from '@echo/ui-model'

export const iconSizes = [SizeSM, SizeMD, SizeLG] as const
export type IconSize = (typeof iconSizes)[number]
export const getIconSizeInPx = (size: IconSize) => {
  switch (size) {
    case SizeSM:
      return 24
    case SizeMD:
      return 30
    case SizeLG:
      return 40
    default:
      throw Error(`Wrong icon size`)
  }
}
