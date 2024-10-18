import { Size } from '@echo/ui/constants/size'

export const getIconSizeInPx = (size: Size) => {
  switch (size) {
    case Size.SM:
      return 24
    case Size.MD:
      return 30
    case Size.LG:
      return 40
    default:
      throw Error(`Wrong icon size`)
  }
}
