import { BannerPictureSize } from '../../constants/banner-picture-size'
import { getBannerPictureSize } from '../../helpers/get-banner-picture-size'
import { DefaultBannerSvg } from './svg/default-banner-svg'
import { SizeLG, SizeMD } from '@echo/ui-model'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface BannerProps {
  bannerUrl: URL | undefined
  size?: BannerPictureSize
}

export const Banner: FunctionComponent<BannerProps> = ({ bannerUrl, size = SizeLG }) => {
  if (isNil(bannerUrl)) {
    return (
      <>
        <div
          className={clsx(
            'absolute',
            'top-0',
            'inset-x-0',
            '-z-10',
            size === SizeLG && 'h-64',
            size === SizeMD && 'h-40',
            'bg-banner'
          )}
        />
        <DefaultBannerSvg
          height={getBannerPictureSize(size)}
          className={clsx(
            'absolute',
            'top-0',
            'inset-x-0',
            '-z-20',
            size === SizeLG && 'h-64',
            size === SizeMD && 'h-40'
          )}
        />
      </>
    )
  }
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%), url('${bannerUrl.href}')`
      }}
      className={clsx('absolute', 'top-0', 'inset-x-0', '-z-10', size === SizeLG && 'h-64', size === SizeMD && 'h-40')}
    />
  )
}
