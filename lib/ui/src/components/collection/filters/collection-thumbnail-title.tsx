import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { FunctionComponent } from 'react'

interface Props {
  collectionName: string
}

export const CollectionThumbnailTitle: FunctionComponent<Props> = ({ collectionName }) => {
  const t = useTranslations('collection.thumbnail')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1', 'prose-label-md')}>
      <span className={clsx('prose-label-md', 'text-white/[0.65]', 'truncate')}>{t('title', { collectionName })}</span>
    </div>
  )
}
