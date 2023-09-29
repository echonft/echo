import { DefaultBannerSvg } from '@echo/ui/components/base/svg/default-banner-svg'
import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { getBannerPictureSize } from '@echo/ui/helpers/get-banner-picture-size'
import type { BannerPictureSize } from '@echo/ui/types/banner-picture-size'
import { clsx } from 'clsx'
import { identity, ifElse, is, isNil, prop } from 'ramda'
import type { FunctionComponent } from 'react'

export interface BannerProps {
  bannerUrl: URL | string | undefined
  bannerSize?: BannerPictureSize
}

export const CollectionBanner: FunctionComponent<BannerProps> = ({ bannerUrl, bannerSize = SizeLG }) => {
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
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%), url('${ifElse(
          is(String),
          identity,
          prop('href')
        )(bannerUrl)}')`
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
