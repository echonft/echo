import { Background } from '@echo/ui/constants/background'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { clsx } from 'clsx'

export function useBackground(background: Background = Background.Default) {
  const className = clsx(
    background === Background.Default && 'bg-dark-500',
    background === Background.Home && ['bg-home', 'bg-[length:100%_41.4375rem]', 'bg-no-repeat'],
    background === Background.Collections && ['bg-home', 'bg-no-repeat'],
    background === Background.GreenGradient && ['bg-gradientGreen', 'bg-no-repeat'],
    background === Background.YellowGradient && ['bg-gradientYellow', 'bg-no-repeat'],
    background === Background.RedGradient && ['bg-gradientRed', 'bg-no-repeat']
  )
  if (background === Background.Success) {
    return {
      className,
      style: {
        background: `url('https://storage.googleapis.com/echo-dev-public/success-banner-left.png?alt=media') 0 1.5rem no-repeat, url('https://storage.googleapis.com/echo-dev-public/success-banner-right.png?alt=media') 100% 1.5rem no-repeat, ${themeExtension.colors.dark['500']}`
      }
    }
  }
  return {
    className
  }
}
