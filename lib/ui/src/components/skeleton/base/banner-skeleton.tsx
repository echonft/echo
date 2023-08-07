import { DefaultBannerSvg } from '../../base/svg/default-banner-svg'
import { clsx } from 'clsx'
import { FunctionComponent } from 'react'

export const BannerSkeleton: FunctionComponent = () => {
  return (
    <>
      <div className={clsx('absolute', 'top-0', 'inset-x-0', '-z-10', 'h-64', 'bg-banner')} />
      <DefaultBannerSvg height={256} className={clsx('absolute', 'top-0', 'inset-x-0', '-z-20', 'h-64', 'blur-sm')} />
    </>
  )
}
