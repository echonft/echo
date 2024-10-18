import { Size } from '@echo/ui/constants/size'

export function getProfilePictureHeightInPx(size: Size): number {
  switch (size) {
    case Size.LG:
      return 160
    case Size.MD:
      return 112
    case Size.SM:
      return 99
  }
}
