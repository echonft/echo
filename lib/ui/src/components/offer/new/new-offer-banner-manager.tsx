'use client'
import { Banner } from '@echo/ui/components/base/banner'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const NewOfferBannerManager: FunctionComponent = () => {
  const t = useTranslations('offer.new.banner')
  const { openModal, hasNewOfferPending } = useNewOfferStore()
  return <Banner open={hasNewOfferPending()} title={t('title')} subtitle={t('btn.label')} onSubtitleClick={openModal} />
}
