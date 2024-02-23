import { NftsFiltersButton } from '@echo/ui/components/nft/filters/layout/nfts-filters-button'
import { useTranslations } from 'next-intl'
import { type FunctionComponent, type MouseEventHandler } from 'react'

interface Props {
  count: number
  onClick?: MouseEventHandler
}

export const CollectionCreateListingButton: FunctionComponent<Props> = ({ count, onClick }) => {
  const t = useTranslations('collection')
  return <NftsFiltersButton label={t('button.createOffer')} count={count} onClick={onClick} />
}
