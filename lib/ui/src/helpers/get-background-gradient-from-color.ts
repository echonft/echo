import { Background } from '@echo/ui/constants/background'
import { Color } from '@echo/ui/constants/color'

export function getBackgroundGradientFromColor(color: Color) {
  switch (color) {
    case Color.Yellow:
      return Background.YellowGradient
    case Color.Green:
      return Background.GreenGradient
    case Color.Red:
      return Background.RedGradient
    default:
      return Background.Default
  }
}
