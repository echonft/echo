'use client'
import { Banner } from '@echo/ui/components/base/banner'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const NewListingBannerManager: FunctionComponent = () => {
  const t = useTranslations('listing.new.banner')
  const { openModal, hasNewListingPending } = useNewListingStore()
  return (
    <Banner open={hasNewListingPending()} title={t('title')} subtitle={t('btn.label')} onSubtitleClick={openModal} />
  )
}
