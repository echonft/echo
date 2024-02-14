import { DEFAULT_BANNER_URL } from '@echo/ui/constants/default-banner-url'
import { classes } from '@echo/ui/helpers/classes'
import { themeExtension } from '@echo/ui/helpers/theme/theme'
import type { Nullable } from '@echo/utils/types/nullable'
import { type FunctionComponent, type PropsWithChildren } from 'react'

export interface CollectionDetailsLayoutProps {
  bannerUrl?: Nullable<string>
}
export const CollectionDetailsLayout: FunctionComponent<PropsWithChildren<CollectionDetailsLayoutProps>> = ({
  bannerUrl,
  children
}) => {
  return (
    <div
      className={classes('w-full', 'bg-contain')}
      style={{
        backgroundImage: `${themeExtension.backgroundImage.banner}, url('${bannerUrl ?? DEFAULT_BANNER_URL}')`
      }}
    >
      {children}
    </div>
  )
}
