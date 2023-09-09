import { SizeLG, SizeMD } from '../../constants/size'
import { getBannerPictureSize } from '../../helpers/get-banner-picture-size'
import { BannerPictureSize } from '../../types/banner-picture-size'
import { DefaultBannerSvg } from '../base/svg/default-banner-svg'
import { clsx } from 'clsx'
import { isNil } from 'ramda'
import { FunctionComponent } from 'react'

export interface BannerProps {
  bannerUrl: URL | undefined
  bannerSize?: BannerPictureSize
}

export const Banner: FunctionComponent<BannerProps> = ({ bannerUrl, bannerSize = SizeLG }) => {
  if (isNil(bannerUrl)) {
    return (
      <>
        <div
          className={clsx(
            'absolute',
            'top-0',
            'inset-x-0',
            '-z-10',
            bannerSize === SizeLG && 'h-64',
            bannerSize === SizeMD && 'h-40',
            'bg-banner'
          )}
        />
        <DefaultBannerSvg
          height={getBannerPictureSize(bannerSize)}
          className={clsx(
            'absolute',
            'top-0',
            'inset-x-0',
            '-z-20',
            bannerSize === SizeLG && 'h-64',
            bannerSize === SizeMD && 'h-40'
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
      className={clsx(
        'absolute',
        'top-0',
        'inset-x-0',
        '-z-10',
        bannerSize === SizeLG && 'h-64',
        bannerSize === SizeMD && 'h-40'
      )}
    />
  )
}
