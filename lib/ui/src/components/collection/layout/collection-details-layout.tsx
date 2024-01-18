import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import { clsx } from 'clsx'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export interface CollectionDetailsLayoutProps {
  bannerUrl?: string
}
export const CollectionDetailsLayout: FunctionComponent<PropsWithChildren<CollectionDetailsLayoutProps>> = ({
  bannerUrl,
  children
}) => {
  return (
    <div
      className={clsx('w-full', 'bg-contain')}
      style={{
        backgroundImage: `${themeExtension.backgroundImage.banner}, url('${bannerUrl ?? DEFAULT_BANNER_URL}')`
      }}
    >
      {children}
    </div>
  )
}
