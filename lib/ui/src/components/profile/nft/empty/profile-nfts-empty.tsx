import { EmptyContent } from '../../../layout/navigation/empty-content'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const ProfileNftsEmpty: FunctionComponent = () => {
  const t = useTranslations('profile.empty.items')
  return <EmptyContent message={t('message')} />
}
