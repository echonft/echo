import type { Collection } from '@echo/model/types/collection'
import { classes } from '@echo/ui/helpers/classes'
import { useTranslations } from 'next-intl'
import { isNil } from 'ramda'
import type { FunctionComponent } from 'react'

export const CollectionProfileSupply: FunctionComponent<Pick<Collection, 'totalSupply'>> = ({ totalSupply }) => {
  const t = useTranslations('collection.details')
  if (isNil(totalSupply)) {
    return null
  }
  return <h2 className={classes('text-white', 'prose-header-md')}>{t('supply', { supply: totalSupply })}</h2>
}
