import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { isNilOrEmpty } from '@echo/utils/fp/is-nil-or-empty'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export interface UserDetailsLayoutProps {
  bannerUrl?: string
  bannerColor?: string
}
export const UserDetailsLayout: FunctionComponent<PropsWithChildren<UserDetailsLayoutProps>> = ({
  bannerUrl,
  bannerColor,
  children
}) => {
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
    <div className={clsx('w-full', 'bg-contain')} style={getStyle()}>
      {children}
    </div>
  )
}
