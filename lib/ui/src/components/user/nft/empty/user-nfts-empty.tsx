import { EmptyViewContent } from '@echo/ui/components/layout/navigation/empty-view-content'
import { useTranslations } from 'next-intl'
import type { FunctionComponent } from 'react'

export const UserNftsEmpty: FunctionComponent = () => {
  const t = useTranslations('user.empty.items')
  return <EmptyViewContent message={t('message')} />
}
