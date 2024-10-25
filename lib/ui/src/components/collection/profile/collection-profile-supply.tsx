import type { Collection } from '@echo/model/types/collection'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export const CollectionProfileSupply: FunctionComponent<Pick<Collection, 'totalSupply'>> = ({ totalSupply }) => {
  const t = useTranslations('collection.details')
  if (isNil(totalSupply)) {
    return null
  }
  return <h2 className={clsx('text-white', 'prose-header-md')}>{t('supply', { supply: totalSupply })}</h2>
}
