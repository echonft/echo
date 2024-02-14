import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { classes } from '@echo/ui/helpers/classes'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import type { FunctionComponent } from 'react'

export interface ProfileBannerProps {
  bannerUrl?: Nullable<string>
  bannerColor?: Nullable<string>
}

export const ProfileBanner: FunctionComponent<ProfileBannerProps> = ({ bannerUrl, bannerColor }) => {
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
      backgroundImage: `${themeExtension.backgroundImage.banner}, url('${bannerUrl}')`
    }
  }
  return (
    <div
      className={classes('w-full', 'h-[15.625rem]', 'bg-no-repeat', 'flex-none', 'select-none', 'bg-cover')}
      style={getStyle()}
    />
  )
}
