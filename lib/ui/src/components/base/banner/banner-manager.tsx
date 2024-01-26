import { Banner } from '@echo/ui/components/base/banner/banner'
import { BannerAbsoluteTopLayout } from '@echo/ui/components/base/banner/banner-absolute-top-layout'
import { useBannerStore } from '@echo/ui/hooks/use-banner-store'
import { isNil } from 'ramda'
import { type FunctionComponent } from 'react'

export const BannerManager: FunctionComponent = () => {
  const { banner } = useBannerStore()
  if (isNil(banner)) {
    return null
  }

  return (
    <BannerAbsoluteTopLayout>
      <Banner {...banner} />
    </BannerAbsoluteTopLayout>
  )
}
