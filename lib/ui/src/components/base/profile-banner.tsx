import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { PICTURE_SIZE_BANNER } from '@echo/ui/constants/picture-size'
import { addPictureSizeToUrl } from '@echo/ui/helpers/add-picture-size-to-url'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import type { FunctionComponent } from 'react'

export interface ProfileBannerProps {
  bannerUrl?: Nullable<string>
  bannerColor?: Nullable<string>
}

export const ProfileBanner: FunctionComponent<ProfileBannerProps> = ({ bannerUrl, bannerColor }) => {
  const url = addPictureSizeToUrl(bannerUrl, PICTURE_SIZE_BANNER)
  function getStyle() {
    if (isNilOrEmpty(bannerUrl)) {
      if (isNilOrEmpty(bannerColor)) {
        return {
          backgroundImage: `${themeExtension.backgroundImage.banner}, url('${DEFAULT_BANNER_URL}')`
        }
      }
      return {
        backgroundColor: bannerColor,
        backgroundImage: themeExtension.backgroundImage.banner
      }
    }
    return {
      backgroundImage: `${themeExtension.backgroundImage.banner}, url('${url}')`
    }
  }
  return (
    <div
      className={clsx('w-full', 'h-[15.625rem]', 'bg-no-repeat', 'flex-none', 'select-none', 'bg-cover')}
      style={getStyle()}
    />
  )
}
