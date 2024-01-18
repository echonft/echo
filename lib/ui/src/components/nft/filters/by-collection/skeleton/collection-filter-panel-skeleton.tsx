import { NftFiltersPanelLayout } from '@echo/ui/components/nft/filters/layout/nft-filters-panel-layout'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

export const CollectionFilterPanelSkeleton: FunctionComponent = () => {
  const t = useTranslations('user.filters.collection')
  return <NftFiltersPanelLayout title={t('title')} className={clsx('animate-pulse', '!h-[15rem]')} />
}
