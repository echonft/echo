import { SelectableNftCardsActionButton } from '@echo/ui/components/nft/selectable-card/selectable-nft-cards-action-button'
import { NftAction } from '@echo/ui/constants/nft-actions'
import { clsx } from 'clsx'
import { useTranslations } from 'next-intl'
import type { FunctionComponent, MouseEventHandler } from 'react'

interface Props {
  action: NftAction
  count: number
  onClick?: MouseEventHandler
}

export const CollectionItemsButton: FunctionComponent<Props> = ({ action, count, onClick }) => {
  const t = useTranslations('nft.action')
  if (action === NftAction.Listing) {
    return (
      <button onClick={onClick} className={clsx('btn-gradient')}>
        <span className={clsx('btn-label-gradient')}>{t('listing')}</span>
      </button>
    )
  }
  return <SelectableNftCardsActionButton action={action} count={count} onClick={onClick} />
}
