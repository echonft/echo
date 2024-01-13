import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export interface UserBannerProps {
  discordBannerUrl: string | undefined
  discordBannerColor?: string
}

export const UserBanner: FunctionComponent<UserBannerProps> = ({ discordBannerUrl, discordBannerColor }) => {
  const defaultBanner = isNil(discordBannerUrl)
  return (
    <div
      style={
        defaultBanner
          ? {
              backgroundColor: discordBannerColor ?? themeExtension.colors.dark['500']
            }
          : {
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%), url('${discordBannerUrl}')`
            }
      }
      className={clsx('absolute', 'top-0', 'inset-x-0', 'h-64', defaultBanner && 'bg-banner')}
    />
  )
}
