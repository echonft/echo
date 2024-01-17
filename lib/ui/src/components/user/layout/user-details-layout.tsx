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
      return {
        backgroundColor: bannerColor ?? themeExtension.colors.dark['500'],
        backgroundImage: themeExtension.backgroundImage.banner
      }
    }
    return {
      backgroundImage: `url('${bannerUrl}')`
    }
  }
  return (
    <div className={clsx('flex', 'flex-col', 'self-stretch', 'w-full', 'bg-cover')} style={getStyle()}>
      {children}
    </div>
  )
}
