import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { type FunctionComponent } from 'react'

interface Props {
  count: number
  collectionName: string
}

export const CollectionThumbnailTitle: FunctionComponent<Props> = ({ count, collectionName }) => {
  const t = useTranslations('collection.thumbnail')
  return (
    <div className={clsx('flex', 'flex-row', 'gap-1', 'prose-label-md')}>
      <span className={clsx('prose-label-md', 'text-white/[0.65]', 'truncate')}>
        {t('title', { count, collectionName })}
      </span>
    </div>
  )
}
