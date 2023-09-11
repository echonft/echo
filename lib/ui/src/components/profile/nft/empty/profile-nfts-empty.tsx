import { EmptyViewContent } from '../../../layout/navigation/empty-view-content'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const ProfileNftsEmpty: FunctionComponent = () => {
  const t = useTranslations('profile.empty.items')
  return <EmptyViewContent message={t('message')} />
}
