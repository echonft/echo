import { SizeLG, SizeMD } from '@echo/ui/constants/size'
import { type BannerPictureSize } from '@echo/ui/types/banner-picture-size'
import { clsx } from 'clsx'
import { always, identity, ifElse, isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export interface BannerProps {
  bannerUrl: string | undefined
  bannerSize?: BannerPictureSize
}

export const CollectionBanner: FunctionComponent<BannerProps> = ({ bannerUrl, bannerSize = SizeLG }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, #121212 100%), url('${ifElse(
          isNil,
          always(
            'https://firebasestorage.googleapis.com/v0/b/echo-83309.appspot.com/o/default-collection-banner.svg?alt=media'
          ),
          identity
        )(bannerUrl)}')`
      }}
      className={clsx(
        'absolute',
        'top-0',
        'inset-x-0',
        'bg-contain',
        bannerSize === SizeLG && 'h-64',
        bannerSize === SizeMD && 'h-40'
      )}
    />
  )
}
