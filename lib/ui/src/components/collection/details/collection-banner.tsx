import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { SIZE_LG, SIZE_MD } from '@echo/ui/constants/size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { type BannerPictureSize } from '@echo/ui/types/banner-picture-size'
import { clsx } from 'clsx'
import { type FunctionComponent } from 'react'

export interface BannerProps {
  bannerUrl: string | undefined
  bannerSize?: BannerPictureSize
}

export const CollectionBanner: FunctionComponent<BannerProps> = ({ bannerUrl, bannerSize = SIZE_LG }) => {
  return (
    <div
      style={{
        backgroundImage: `${themeExtension.backgroundImage.banner}, url('${bannerUrl ?? DEFAULT_BANNER_URL}')`
      }}
      className={clsx(
        'absolute',
        'top-0',
        'inset-x-0',
        'bg-contain',
        bannerSize === SIZE_LG && 'h-64',
        bannerSize === SIZE_MD && 'h-40'
      )}
    />
  )
}
