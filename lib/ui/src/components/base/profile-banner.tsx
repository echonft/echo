import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { PICTURE_SIZE_XXL } from '@echo/ui/constants/picture-size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
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
  const url = addPictureSize({ src: bannerUrl ?? '', width: PICTURE_SIZE_XXL })
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
