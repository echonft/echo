'use client'
import { EmptyViewContent } from '@echo/ui/components/base/navigation/empty-view-content'
import { ProfileNftsEmptyButton } from '@echo/ui/pages/profile/nfts/profile-nfts-empty-button'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const ProfileNftsEmpty: FunctionComponent = () => {
  const t = useTranslations('profile.empty.items')
  return (
    <EmptyViewContent message={t('message')}>
      <ProfileNftsEmptyButton />
    </EmptyViewContent>
  )
}
