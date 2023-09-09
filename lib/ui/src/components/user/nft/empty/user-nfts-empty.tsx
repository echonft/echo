import { EmptyContent } from '../../../layout/navigation/empty-content'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

export const UserNftsEmpty: FunctionComponent = () => {
  const t = useTranslations('user.empty.items')
  return <EmptyContent message={t('message')} />
}
