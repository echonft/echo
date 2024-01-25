'use client'
import { Banner } from '@echo/ui/components/base/banner/banner'
import { BannerAbsoluteTopLayout } from '@echo/ui/components/base/banner/banner-absolute-top-layout'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const ListingBannerManager: FunctionComponent = () => {
  const t = useTranslations('listing.details.banner')

  return (
    <BannerAbsoluteTopLayout>
      <Banner title={t('title')} />
    </BannerAbsoluteTopLayout>
  )
}
