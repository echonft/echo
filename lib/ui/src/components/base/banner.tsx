import { DefaultBannerSvg } from './svg/default-banner-svg'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface BannerProps {
  bannerUrl: URL | undefined
}

export const Banner: FunctionComponent<BannerProps> = ({ bannerUrl }) => {
  if (isNil(bannerUrl)) {
    return (
      <>
        <div className={clsx('absolute', 'top-0', 'inset-x-0', '-z-10', 'h-64', 'bg-banner')} />
        <DefaultBannerSvg height={256} className={clsx('absolute', 'top-0', 'inset-x-0', '-z-20', 'h-64')} />
      </>
    )
  }
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%), url('${bannerUrl.href}')`
      }}
      className={clsx('absolute', 'top-0', 'inset-x-0', '-z-10', 'h-64')}
    />
  )
}
