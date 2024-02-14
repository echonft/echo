import { Banner } from '@echo/ui/components/base/banner/banner'
import { classes } from '@echo/ui/helpers/classes'
import { useBannerStore } from '@echo/ui/hooks/use-banner-store'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const BannerManager: FunctionComponent = () => {
  const { banner } = useBannerStore()
  if (isNil(banner)) {
    return null
  }

  return (
    <div className={classes('absolute', 'top-0', 'inset-x-0')}>
      <Banner {...banner} />
    </div>
  )
}
