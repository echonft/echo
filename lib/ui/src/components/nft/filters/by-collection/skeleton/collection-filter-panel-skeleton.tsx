import { NftFiltersPanelLayoutSkeleton } from '@echo/ui/components/nft/filters/layout/skeleton/nft-filters-panel-layout-skeleton'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('user.filters.collection')
  return <NftFiltersPanelLayoutSkeleton title={t('title')} />
}
