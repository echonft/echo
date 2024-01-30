'use client'
import { useBannerStore } from '@echo/ui/hooks/use-banner-store'
import { useNewListingStore } from '@echo/ui/hooks/use-new-listing-store'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, useEffect } from 'react'

export const CreateListingBannerManager: FunctionComponent = () => {
  const t = useTranslations('listing.create.banner')
  const { openModal, hasNewListingPending } = useNewListingStore()
  const { show, dismiss } = useBannerStore()
  useEffect(() => {
    if (hasNewListingPending) {
      show({ title: t('title'), subtitle: t('btn'), onClick: openModal })
    } else {
      dismiss()
    }
    return dismiss
  }, [hasNewListingPending, show, dismiss, openModal, t])
  return null
}
