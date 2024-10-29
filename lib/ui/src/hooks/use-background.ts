import { Background } from '@echo/ui/constants/background'
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
  return {
    className
  }
}
