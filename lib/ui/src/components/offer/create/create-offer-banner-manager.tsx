'use client'
import { useBannerStore } from '@echo/ui/hooks/use-banner-store'
import { useNewOfferStore } from '@echo/ui/hooks/use-new-offer-store'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useEffect } from 'react'

export const CreateOfferBannerManager: FunctionComponent = () => {
  const t = useTranslations('offer.create.banner')
  const { openModal, hasNewOfferPending } = useNewOfferStore()
  const { show, dismiss } = useBannerStore()
  useEffect(() => {
    if (hasNewOfferPending) {
      show({ title: t('title'), subtitle: t('btn'), onClick: openModal })
    } else {
      dismiss()
    }
    return dismiss
  }, [hasNewOfferPending, show, dismiss, openModal, t])
  return null
}
