import { clsx } from 'clsx'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export interface UserBannerProps {
  discordBannerUrl: string | undefined
  discordBannerColor: string
}

export const UserBanner: FunctionComponent<UserBannerProps> = ({ discordBannerUrl, discordBannerColor }) => {
  if (isNil(discordBannerUrl)) {
    return (
      <>
        <div className={clsx('absolute', 'top-0', 'inset-x-0', '-z-10', 'h-64', 'bg-banner')} />
        <div
          style={{
            backgroundColor: discordBannerColor
          }}
          className={clsx('absolute', 'top-0', 'inset-x-0', '-z-20', 'h-64')}
        />
      </>
    )
  }
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%), url('${discordBannerUrl}')`
      }}
      className={clsx('absolute', 'top-0', 'inset-x-0', '-z-10', 'h-64')}
    />
  )
}
