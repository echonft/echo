import {
  BG_COLLECTIONS,
  BG_DEFAULT,
  BG_GREEN_GRADIENT,
  BG_HOME,
  BG_RED_GRADIENT,
  BG_SUCCESS,
  BG_YELLOW_GRADIENT
} from '@echo/ui/constants/background'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import type { Background } from '@echo/ui/types/background'
import { clsx } from 'clsx'

export function useBackground(background: Background = BG_DEFAULT) {
  const className = clsx(
    background === BG_DEFAULT && 'bg-dark-500',
    background === BG_HOME && ['bg-home', 'bg-[length:100%_41.4375rem]', 'bg-no-repeat'],
    background === BG_COLLECTIONS && ['bg-home', 'bg-no-repeat'],
    background === BG_GREEN_GRADIENT && ['bg-gradientGreen', 'bg-no-repeat'],
    background === BG_YELLOW_GRADIENT && ['bg-gradientYellow', 'bg-no-repeat'],
    background === BG_RED_GRADIENT && ['bg-gradientRed', 'bg-no-repeat']
  )
  if (background === BG_SUCCESS) {
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
