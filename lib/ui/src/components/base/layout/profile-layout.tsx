import { defaultBannerUrl } from '@echo/ui/constants/default-banner-url'
import { PictureSize } from '@echo/ui/constants/picture-size'
import { addPictureSize } from '@echo/ui/helpers/add-picture-size'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import type { Nullable } from '@echo/utils/types/nullable'
import { clsx } from 'clsx'
import type { FunctionComponent, PropsWithChildren } from 'react'

export interface ProfileBannerProps {
  bannerUrl?: Nullable<string>
}

export const ProfileLayout: FunctionComponent<PropsWithChildren<ProfileBannerProps>> = ({ bannerUrl, children }) => {
  const url = addPictureSize({ src: bannerUrl ?? '', width: PictureSize.XXL })
  function getStyle() {
    if (isNilOrEmpty(bannerUrl)) {
      return {
        backgroundImage: `${themeExtension.backgroundImage.banner}, url('${defaultBannerUrl}')`
      }
    }
    return {
      backgroundImage: `${themeExtension.backgroundImage.banner}, url('${url}')`
    }
  }
  return (
    <div
      className={clsx('w-full', 'h-full', 'bg-no-repeat', 'select-none', 'bg-cover', 'bg-top', 'overflow-clip')}
      style={getStyle()}
    >
      <div className={clsx('flex', 'flex-col', 'gap-10', 'backdrop-blur-md', 'pt-16')}>{children}</div>
    </div>
  )
}
